import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT,
    domain_api: process.env.DOMAIN_API,
    version: process.env.API_VERSION,

    pgsql_host: process.env.PGSQL_HOST,
    pgsql_port: process.env.PGSQL_PORT,
    pgsql_user: process.env.PGSQL_USER,
    pgsql_pass: process.env.PGSQL_PASS,
    pgsql_db: process.env.PGSQL_DB,

    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
    encrypt_token_secret: process.env.ENCRYPT_TOKEN_SECRET,

    access_token_exp: process.env.ACCESS_TOKEN_EXP,
    refresh_token_exp: process.env.REFRESH_TOKEN_EXP,
}

export default config;