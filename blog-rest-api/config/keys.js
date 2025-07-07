const { 
  PORT,
  CONNECTION_URL,
  JWT_SECRET,
  EMAIL_ACCOUNT,
  EMAIL_APP_PASSWORD,
  EMAIL_HOST,
  EMAIL_PORT,
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
  AWS_REGION,
  AWS_BUCKET_NAME,
} = process.env;

module.exports = {
  port: PORT,
  connectionUrl: CONNECTION_URL,
  jwtSecret: JWT_SECRET,
  emailAccount: EMAIL_ACCOUNT,
  emailAppPassword: EMAIL_APP_PASSWORD,
  emailHost: EMAIL_HOST,
  emailPort: EMAIL_PORT,
  awsAccessKey: AWS_ACCESS_KEY,
  awsSecretKey: AWS_SECRET_KEY,
  awsRegion: AWS_REGION,
  awsBucketName: AWS_BUCKET_NAME,
}