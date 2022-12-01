import { EnvironmentSecrets, Secrets, Environment } from './secretsTypes';
import env from '../../src/helpers/environmentVariables';

const environment: Environment = env.ENV_NAME as Environment;

export const channelsService: EnvironmentSecrets = {
  secretPath: {
    skynetConfiguration: '/fibr-api-service/skynet_configuration',
    salesforce: '/fibr-api-service/api/salesforce',
  },
  development: {
    roleArn: 'arn:aws:iam::213620759099:role/deploy-services',
  },
  acceptance: {
    roleArn: 'arn:aws:iam::716094655730:role/deploy-services',
  },
};

export const productDomain: EnvironmentSecrets = {
  secretPath: {
    skynetConfiguration: '/payment-gateway-v1/skynet_configuration',
  },
  development: {
    roleArn: 'arn:aws:iam::238975910106:role/deploy-services',
  },
  acceptance: {
    roleArn: 'arn:aws:iam::525690187284:role/deploy-services',
  },
};

export const paymentService: EnvironmentSecrets = {
  secretPath: {
    skynetConfiguration: '/payment-service/skynet_configuration',
  },
  development: {
    roleArn: 'arn:aws:iam::860413544065:role/deploy-services',
  },
  acceptance: {
    roleArn: 'arn:aws:iam::470597467234:role/deploy-services',
  },
};

export const secrets: Secrets = {
  'channels-retail-api-service': {
    roleArn: channelsService[environment].roleArn,
    secretPath: channelsService.secretPath.skynetConfiguration,
    key: ['cognitoApiKey'],
  },
  'channels-retail-web-app': {
    roleArn: channelsService[environment].roleArn,
    secretPath: channelsService.secretPath.skynetConfiguration,
    key: ['token', 'tokenFibr', 'username', 'password'],
  },
  'customer-salesforce-service': {
    roleArn: channelsService[environment].roleArn,
    secretPath: channelsService.secretPath.salesforce as string,
    key: ['username', 'password', 'clientSecret', 'clientId'],
  },
  'product-account-service': {
    roleArn: productDomain[environment].roleArn,
    secretPath: productDomain.secretPath.skynetConfiguration,
    key: [
      'username',
      'password',
      'fibrbank_channels_retail_api_dev_username',
      'fibrbank_channels_retail_api_dev_password',
      'x-api-key',
      'mambuApiKey',
    ],
  },
  'payments-payment-service': {
    roleArn: paymentService[environment].roleArn,
    secretPath: paymentService.secretPath.skynetConfiguration,
    key: ['mt103CodeKey'],
  },
  'customer-integration-service': {
    roleArn: productDomain[environment].roleArn,
    secretPath: productDomain.secretPath.skynetConfiguration,
    key: ['username', 'password', 'x-api-key'],
  },
  'product-payment-gateway': {
    roleArn: productDomain[environment].roleArn,
    secretPath: productDomain.secretPath.skynetConfiguration,
    key: ['mambuApiKey'],
  },
  'qa-automation-skynet': {},
};
