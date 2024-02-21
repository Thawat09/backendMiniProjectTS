import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT,
    domain_api: process.env.DOMAIN_API,
    version: process.env.API_VERSION
}

export default config;