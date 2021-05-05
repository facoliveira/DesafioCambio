import * as cdk from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";
import * as ecr from "@aws-cdk/aws-ecr";
import { DockerImageAsset } from "@aws-cdk/aws-ecr-assets";
import * as path from "path";

export class FrontendStack extends cdk.Stack {
  constructor(
    scope: cdk.Construct,
    id: string,
    apiEndpoint: string,
    props?: cdk.StackProps
  ) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "FrontendVpc", {
      maxAzs: 2,
    });

    const cluster = new ecs.Cluster(this, "FrontendCluster", {
      vpc: vpc,
    });

    const asset = new DockerImageAsset(this, "frontend-image", {
      directory: path.join(__dirname, "..", "..", "src"),
      file: "Dockerfile.web"
    });

    new ecs_patterns.ApplicationLoadBalancedFargateService(this, "FrontendService", {
      cluster: cluster,
      cpu: 256,
      memoryLimitMiB: 512,
      desiredCount: 1,
      taskImageOptions: {
        image: ecs.ContainerImage.fromDockerImageAsset(asset),
        environment: {
          API_URL: apiEndpoint + "/api/",
          PRODUCTION: "true",
        },
      },
      publicLoadBalancer: true,
    });
  }
}