import { adminConnection } from '../db/adminConnection.js';
import { backendLogger } from './logger.js';

/**
 * Returns the admin-connection version of a Mongoose model.
 * Falls back to the default model when the admin connection is not ready
 * (e.g. MONGODB_URL_ADMIN not configured, or connection still initialising).
 */
export function getAdminModel(Model) {
    if (!adminConnection || adminConnection.readyState !== 1) {
        backendLogger.warn({
            module: "utils.getAdminModel",
            action: "DB_CONNECT",
            step: "READ_DB",
            status: "FAILURE",
            message: `[DB_CONNECT] READ_DB FAILURE`,
            errorCode: "DB_ERROR",
            errorMessage: "Admin DB unavailable, using default model",
            meta: { modelName: Model?.modelName || "Unknown" },
        });
        return Model;
    }

    backendLogger.info({
        module: "utils.getAdminModel",
        action: "DB_CONNECT",
        step: "READ_DB",
        status: "SUCCESS",
        message: `[DB_CONNECT] READ_DB SUCCESS`,
        meta: { modelName: Model?.modelName || "Unknown", source: "adminConnection" },
    });

    const { modelName, schema } = Model;
    return adminConnection.models[modelName] ?? adminConnection.model(modelName, schema);
}
