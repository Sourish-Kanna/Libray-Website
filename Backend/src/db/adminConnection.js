import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';
import { backendLogger } from '../utils/logger.js';

export let adminConnection = null;

export const connectAdminDB = async () => {
    const start = Date.now();
    const adminUrl = process.env.MONGODB_URL_ADMIN?.trim();
    if (!adminUrl) {
        backendLogger.warn({
            module: "db.adminConnection",
            action: "DB_CONNECT",
            step: "VALIDATE_INPUT",
            status: "FAILURE",
            message: `[DB_CONNECT] VALIDATE_INPUT FAILURE`,
            errorCode: "VALIDATION_ERROR",
            errorMessage: "MONGODB_URL_ADMIN not configured",
        });
        console.warn(' Admin DB: MONGODB_URL_ADMIN not set — writes will fall back to default connection');
        return;
    }

    backendLogger.info({
        module: "db.adminConnection",
        action: "DB_CONNECT",
        step: "START",
        status: "STARTED",
        message: `[DB_CONNECT] START STARTED`,
        meta: { dbName: DB_NAME, target: "admin" },
    });

    try {
        adminConnection = await mongoose
            .createConnection(`${adminUrl}/${DB_NAME}?appName=SIESGST_Library`)
            .asPromise();
        backendLogger.info({
            module: "db.adminConnection",
            action: "DB_CONNECT",
            step: "END",
            status: "SUCCESS",
            message: `[DB_CONNECT] END SUCCESS`,
            durationMs: Date.now() - start,
            meta: { host: adminConnection.host, target: "admin" },
        });
        console.log(` Admin DB connected: ${adminConnection.host}`);
    } catch (error) {
        backendLogger.error({
            module: "db.adminConnection",
            action: "DB_CONNECT",
            step: "END",
            status: "FAILURE",
            message: `[DB_CONNECT] END FAILURE`,
            durationMs: Date.now() - start,
            errorCode: "DB_ERROR",
            errorMessage: error.message,
            meta: { target: "admin" },
        });
        console.error(' Admin DB connection failed:', error.message);
        // non-fatal: write operations fall back to the default connection
    }
};
