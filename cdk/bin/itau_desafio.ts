#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { BackendStack } from "../lib/backend";
import { FrontendStack } from "../lib/frontend";
import { ApiStack } from "../lib/api";

const env = { region: "sa-east-1" };
const app = new cdk.App();

const backendStack = new BackendStack(app, "BackendStack", { env: env });
const apiStack = new ApiStack(app, "ApiStack", backendStack.vpcLink, backendStack.apiListener, { env: env });
new FrontendStack(app, "FrontendStack", apiStack.apiEndpoint, { env: env });