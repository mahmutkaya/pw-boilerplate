import { assumeRole } from './authorization';
import { evaluateParameters } from '../evaluateParameters';
import { SecretsManager } from 'aws-sdk';
import { GetSecretValueResponse } from 'aws-sdk/clients/secretsmanager';
import { AssumeRoleResponse } from 'aws-sdk/clients/sts';

type SecretKey = {
  [key: string]: unknown;
};

export async function getSecrets(secretKey: SecretKey, roleArn: string, secretPath: string) {
  const credentialsData = {
    roleArn: roleArn,
    roleSessionName: 'testAutomation',
  };

  const credentials: AssumeRoleResponse['Credentials'] = await assumeRole(credentialsData);

  const secretManager = new SecretsManager({
    credentials: {
      accessKeyId: credentials!.AccessKeyId,
      secretAccessKey: credentials!.SecretAccessKey,
      sessionToken: credentials!.SessionToken,
    },
    region: 'eu-west-1',
  });

  const secretsData: GetSecretValueResponse = await secretManager.getSecretValue({ SecretId: secretPath }).promise();
  const secretValue = JSON.parse(secretsData.SecretString as string);
  const parameterEval = evaluateParameters(secretValue, `{{${secretKey}}}`);

  return parameterEval;
}
