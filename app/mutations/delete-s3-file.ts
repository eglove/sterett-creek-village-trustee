import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { resolver } from 'blitz';

import { IdSchema } from '../validations';

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(IdSchema),
  async ({ id }) => {
    const client = new S3Client({
      credentials: {
        accessKeyId: process.env.S3_UPLOAD_KEY ?? '',
        secretAccessKey: process.env.S3_UPLOAD_SECRET ?? '',
      },
      region: process.env.S3_UPLOAD_REGION ?? '',
    });

    const command = new DeleteObjectCommand({
      Bucket: process.env.S3_UPLOAD_BUCKET ?? '',
      Key: id,
    });

    await client.send(command);

    return id;
  }
);
