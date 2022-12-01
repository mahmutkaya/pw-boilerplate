export type Environment = 'development' | 'acceptance';

type SecretPath = {
  skynetConfiguration: string;
  salesforce?: string;
};

export type EnvironmentSecrets = {
  secretPath: SecretPath;
  development: {
    roleArn: string;
  };
  acceptance: {
    roleArn: string;
  };
};

type Project = {
  roleArn: string;
  secretPath: string;
  key: string[];
};

export type Secrets = {
  'channels-retail-api-service': Project;
  'channels-retail-web-app': Project;
  'customer-salesforce-service': Project;
  'product-account-service': Project;
  'payments-payment-service': Project;
  'customer-integration-service': Project;
  'product-payment-gateway': Project;
  'qa-automation-skynet': object;
};
