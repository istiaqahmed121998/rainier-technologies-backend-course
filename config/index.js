require('dotenv').config();

const bunyan = require('bunyan');

const loggers = {
    development: () => bunyan.createLogger({ name: "development", level: "debug" }),
    production: () => bunyan.createLogger({ name: "production", level: "info" }),
    test: () => bunyan.createLogger({ name: "test", level: "fatal" }),
}

module.exports = {
    development: {
        sitename: 'Rainier Technologies Courses [Development]',
        log: loggers.development,
        database: {
            DATABASE_NAME: process.env.DEVELOPMENT_DB_NAME,
            DATABASE_USERNAME: process.env.DEVELOPMENT_DB_USERNAME,
            DATABASE_PASSWORD: process.env.DEVELOPMENT_DB_PASSWORD,
            DATABASE_HOST: process.env.DEVELOPMENT_DB_HOST,
            DATABASE_PORT: process.env.DEVELOPMENT_DB_PORT,
            DIALECT:process.env.DEVELOPMENT_DB_DIALECT
        },
    },
    production: {
        sitename: 'Rainier Technologies Courses',
        log: loggers.production,
        database: {
            DATABASE_NAME: process.env.PRODUCTION_DB_NAME,
            USERNAME: process.env.PRODUCTION_DB_USERNAME,
            PASSWORD: process.env.PRODUCTION_DB_PASSWORD,
            DATABASE_HOST: process.env.PRODUCTION_DB_HOST,
            DATABASE_PORT: process.env.PRODUCTION_DB_PORT,
            DIALECT:process.env.PRODUCTION_DB_DIALECT
        },
    },
    test: {
        sitename: 'Rainier Technologies Courses [Test]',
        log: loggers.test,
        database: {
            dsn: process.env.TEST_DB_DSN,
        },
    },
};