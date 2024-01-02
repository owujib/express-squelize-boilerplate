import {
  S3Client,
  DeleteObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';

class AWSStorageProvider {
  private readonly s3: S3Client;
  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_DEFAULT_REGION!,
      credentials: {
        accessKeyId: <string>process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: <string>process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  async removeFile(Key: string) {
    const deleteCommand = new DeleteObjectCommand({
      Key: Key!,
      Bucket: process.env.AWS_BUCKET!,
    });

    return this.s3.send(deleteCommand);
  }

  async uploadFile(
    file: Express.Multer.File,
    resource_type?: any,
    folder?: any,
  ) {
    const uploadCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET!,
      Key: `${Date.now().toString()}-${file?.originalname?.replace(' ', '-')}`,
      Body: file.buffer,
    });

    return this.s3.send(uploadCommand);
  }
}

export default AWSStorageProvider;
