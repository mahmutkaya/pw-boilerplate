import log from '../../helpers/logging/logging';
import AWS, { STS } from 'aws-sdk';
import { existsSync } from 'fs';

function getAwsCredentials() {
  const credentialsFile = '/root/.aws/credentials';
  if (existsSync(credentialsFile)) {
    log.info('Authenticating with local AWS credentials');
    const credentials = new AWS.SharedIniFileCredentials({ profile: 'atbank' });

    return {
      AWS_ACCESS_KEY_ID: credentials.accessKeyId,
      AWS_SECRET_ACCESS_KEY: credentials.secretAccessKey,
      AWS_SESSION_TOKEN: credentials.sessionToken,
    };
  } else {
    return {
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
      AWS_SESSION_TOKEN: process.env.AWS_SESSION_TOKEN,
    };
  }
}

export async function assumeRole(data: { [key: string]: string }) {
  const externalId = process.env.AWS_ROLE_EXTERNAL_ID;
  const roleArn = data['roleArn'];
  const roleSessionName = 'TestAutomation';

  const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN } = getAwsCredentials();

  const sts = await new STS({
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID as string,
      secretAccessKey: AWS_SECRET_ACCESS_KEY as string,
      ...(AWS_SESSION_TOKEN ? { sessionToken: AWS_SESSION_TOKEN } : {}),
    },
    region: 'eu-west-1',
  });

  log.info(`Assuming role ${roleArn}`);
  const response = await sts
    .assumeRole({
      ExternalId: externalId,
      RoleArn: roleArn,
      RoleSessionName: roleSessionName,
    })
    .promise();

  return response.Credentials;
}
