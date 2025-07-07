const { PutObjectCommand, S3Client, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const generateCode = require('./generateCode');
const { awsRegion, awsAccessKey, awsSecretKey, awsBucketName } = require('../config/keys');

const client = new S3Client({
  region: awsRegion,
  credentials: {
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretKey,
  },
});

const uploadFileToS3 = async ({ file, ext }) => {
  const key = `${generateCode(12)}_${Date.now()}${ext}`;

  const params = {
    Bucket: awsBucketName,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };

  const command = new PutObjectCommand(params);

  try {
    await client.send(command);
    return key; // Return the S3 key of the uploaded file
  } catch (error) {
    throw new Error(`Error uploading file to S3: ${error.message}`);
  }
}

const signedUrl = async (key) => {
  const params = {
    Bucket: awsBucketName,
    Key: key,
  };

  const command = new GetObjectCommand(params);

  try {
    const url = await getSignedUrl(client, command, { expiresIn: 3600 }); // URL valid for 1 hour
    return url;
  } catch (error) {
    throw new Error(`Error generating signed URL: ${error.message}`);
  }
}

const deleteFileFromS3 = async (key) => {
  const params = {
    Bucket: awsBucketName,
    Key: key,
  };

  const command = new DeleteObjectCommand(params);

  try {
    await client.send(command);
    return true; // Return true if the file was deleted successfully
  } catch (error) {
    throw new Error(`Error deleting file from S3: ${error.message}`);
  }
}

module.exports = {
  uploadFileToS3,
  signedUrl,
  deleteFileFromS3,
};