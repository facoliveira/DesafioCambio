import * as cdk from "@aws-cdk/core";
import * as elbv2 from "@aws-cdk/aws-elasticloadbalancingv2";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as sd from "@aws-cdk/aws-servicediscovery";
import * as ecr from "@aws-cdk/aws-ecr";
import { DockerImageAsset } from '@aws-cdk/aws-ecr-assets';
import * as path from 'path';

export class BackendStack extends cdk.Stack {
  
  //Export Vpclink and ALB Listener
  public readonly vpcLink: cdk.CfnResource;
  public readonly apiListener: elbv2.ApplicationListener;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPC
    const vpc = new ec2.Vpc(this, "BackendVPC");

    // ECS Cluster
    const cluster = new ecs.Cluster(this, "BackendFargateCluster", {
      clusterName: "BackendFargateCluster",
      vpc: vpc,
    });

    // Cloud Map Namespace
    const dnsNamespace = new sd.PrivateDnsNamespace(this, "DnsNamespace", {
      name: "http-api.local",
      vpc: vpc,
      description: "Private DnsNamespace",
    });

    // Task Definitions
    const serviceTaskDefinition = new ecs.FargateTaskDefinition(this, "BackendServiceTaskDef", {
      memoryLimitMiB: 1024,
      cpu: 512,
    });

    // Docker Image
    const asset = new DockerImageAsset(this, 'backend-image', {
      directory: path.join(__dirname, "..", "..", "src")
    });

    // Task Containers
    const serviceContainer = serviceTaskDefinition.addContainer("BackendServiceContainer", {
      image: ecs.ContainerImage.fromDockerImageAsset(asset),
    });

    serviceContainer.addPortMappings({
      containerPort: 80,
    });

    //Security Groups
    const serviceSecGrp = new ec2.SecurityGroup(this, "BackendServiceSecurityGroup", {
      allowAllOutbound: true,
      securityGroupName: "BackendServiceSecurityGroup",
      vpc: vpc,
    });

    serviceSecGrp.connections.allowFromAnyIpv4(ec2.Port.tcp(80));

    // Fargate Services
    const backendService = new ecs.FargateService(this, "BackendService", {
      cluster: cluster,
      taskDefinition: serviceTaskDefinition,
      assignPublicIp: false,
      desiredCount: 1,
      securityGroup: serviceSecGrp,
      cloudMapOptions: {
        name: "BackendService",
        cloudMapNamespace: dnsNamespace,
      },
    });

    // Application Load Balancer
    const apiInternalALB = new elbv2.ApplicationLoadBalancer(this, "ApiInternalALB", {
      vpc: vpc,
      internetFacing: false,
    });

    // ALB Listener
    this.apiListener = apiInternalALB.addListener("ApiListener", {
      port: 80,
      // Default Target Group
      defaultAction: elbv2.ListenerAction.fixedResponse(200),
    });

    // Target Groups
    const serviceTargetGroup = this.apiListener.addTargets("BackendServiceTargetGroup", {
      port: 80,
      priority: 1,
      healthCheck: {
        path: "/api/health",
        interval: cdk.Duration.seconds(30),
        timeout: cdk.Duration.seconds(3),
      },
      targets: [backendService],
      pathPattern: "/api/*",
    });

    //VPC Link
    this.vpcLink = new cdk.CfnResource(this, "VpcLink", {
      type: "AWS::ApiGatewayV2::VpcLink",
      properties: {
        Name: "http-api-vpclink",
        SubnetIds: vpc.privateSubnets.map((m) => m.subnetId),
      },
    });
  }
}