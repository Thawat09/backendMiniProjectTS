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

    secret_key: process.env.SECRET_KEY,
}

export default config;