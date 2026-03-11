import { STSClient, GetCallerIdentityCommand } from '@aws-sdk/client-sts';

export type CallerIdentity = {
  accountId: string;
  arn: string;
  userId: string;
};

/**
 * Returns the current AWS caller identity (account, ARN, user ID).
 */
export async function getCallerIdentity(): Promise<CallerIdentity> {
  const client = new STSClient({});
  const response = await client.send(new GetCallerIdentityCommand({}));

  return {
    accountId: response.Account ?? 'unknown',
    arn: response.Arn ?? 'unknown',
    userId: response.UserId ?? 'unknown',
  };
}
