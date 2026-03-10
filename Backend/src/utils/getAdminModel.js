import { adminConnection } from '../db/adminConnection.js';

/**
 * Returns the admin-connection version of a Mongoose model.
 * Falls back to the default model when the admin connection is not ready
 * (e.g. MONGODB_URL_ADMIN not configured, or connection still initialising).
 */
export function getAdminModel(Model) {
    if (!adminConnection || adminConnection.readyState !== 1) {
        return Model;
    }
    const { modelName, schema } = Model;
    return adminConnection.models[modelName] ?? adminConnection.model(modelName, schema);
}
