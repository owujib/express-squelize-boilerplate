import { string } from 'joi';

namespace Nodejs {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;

    UPLOADS_DIR: string;

    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;

    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_HOST: string;
    DIALECT: string;

    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_DEFAULT_REGION: string;
    AWS_BUCKET: string;
    AWS_URL: string;
    AWS_ENDPOINT: string;
    AWS_USE_PATH_STYLE_ENDPOINT: string;

    EMAIL_HOST: string;
    EMAIL_PORT: string;
    EMAIL_USERNAME: string;
    EMAIL_PASSWORD: string;
  }
}
