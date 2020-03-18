This is a tiny React app that demonstrates how to upload files to an AWS S3
storage bucket. It also demonstrates how to use basic authentication.

## Environment Variables

For this to work properly, you need a `.env` file in the root of the repo
with information for a valid AWS account and S3 bucket:

```
REACT_APP_S3_REGION=<region-for-s3-bucket>
REACT_APP_S3_BUCKET_NAME=<name-of-bucket>
REACT_APP_S3_ACCESS_KEY_ID=<access-key-id>
REACT_APP_S3_SECRET_ACCESS_KEY=<secret-access-key>
```
