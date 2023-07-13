import "dotenv/config";

export default {
    ENV: `${process.env.ENV}`,
    PORT: Number(`${process.env.PORT}`),
    HOST: `${process.env.HOST}`,
    MySQL_HOST: `${process.env.MySQL_HOST}`,
    MySQL_PORT: Number(`${process.env.MySQL_PORT}`),
    MySQL_DB: `${process.env.MySQL_DB}`,
    MySQL_DB_TEST: `${process.env.MySQL_DB_TEST}`,
    MySQL_USER: `${process.env.MySQL_USER}`,
    MySQL_PASSWORD: `${process.env.MySQL_PASSWORD}`,
    PEPPER: `${process.env.PEPPER}`,
    SALT_ROUNDS: Number(`${process.env.SALT_ROUNDS}`),
    JWT_SECRET: `${process.env.JWT_SECRET}`,
};
