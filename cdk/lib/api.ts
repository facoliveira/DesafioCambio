import * as cdk from "@aws-cdk/core";
import * as elbv2 from "@aws-cdk/aws-elasticloadbalancingv2";
import * as apig from "@aws-cdk/aws-apigatewayv2";

export class ApiStack extends cdk.Stack {

  public readonly apiEndpoint: string;
  constructor(
    scope: cdk.Construct,
    id: string,
    vpcLink: cdk.CfnResource,
    apiListener: elbv2.ApplicationListener,
    props?: cdk.StackProps
  ) {
    super(scope, id, props);

    // HTTP API
    const api = new apig.HttpApi(this, "http-api", {
      createDefaultStage: true,
    });

    // API Integration
    const integration = new apig.CfnIntegration(this, "HttpApiGatewayIntegration", {
      apiId: api.httpApiId,
      connectionId: vpcLink.ref,
      connectionType: "VPC_LINK",
      description: "API Integration",
      integrationMethod: "ANY",
      integrationType: "HTTP_PROXY",
      integrationUri: apiListener.listenerArn,
      payloadFormatVersion: "1.0",
    });

    // API Route
    new apig.CfnRoute(this, "Route", {
      apiId: api.httpApiId,
      routeKey: "ANY /{proxy+}",
      target: `integrations/${integration.ref}`,
    });

    this.apiEndpoint = api.apiEndpoint;
  }
}