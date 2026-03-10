import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
import { backendLogger } from "../utils/logger.js";

export const verifyJWT = asyncHandler(async(req, _, next) => {
    const requestId = req?.requestId;
    const start = Date.now();

    backendLogger.info({
        module: "auth.middleware",
        action: "AUTH_VERIFY_JWT",
        step: "START",
        status: "STARTED",
        requestId,
        message: `[AUTH_VERIFY_JWT] START STARTED`,
    });

    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        backendLogger.info({
            module: "auth.middleware",
            action: "AUTH_VERIFY_JWT",
            step: "VALIDATE_INPUT",
            status: "SUCCESS",
            requestId,
            message: `[AUTH_VERIFY_JWT] VALIDATE_INPUT SUCCESS`,
            meta: {
                hasCookieToken: Boolean(req.cookies?.accessToken),
                hasHeaderToken: Boolean(req.header("Authorization")),
            },
        });

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        backendLogger.info({
            module: "auth.middleware",
            action: "AUTH_VERIFY_JWT",
            step: "VALIDATE_TOKEN",
            status: "STARTED",
            requestId,
            message: `[AUTH_VERIFY_JWT] VALIDATE_TOKEN STARTED`,
        });
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        backendLogger.info({
            module: "auth.middleware",
            action: "AUTH_VERIFY_JWT",
            step: "READ_DB",
            status: "STARTED",
            requestId,
            message: `[AUTH_VERIFY_JWT] READ_DB STARTED`,
        });
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;

        backendLogger.info({
            module: "auth.middleware",
            action: "AUTH_VERIFY_JWT",
            step: "END",
            status: "SUCCESS",
            requestId,
            message: `[AUTH_VERIFY_JWT] END SUCCESS`,
            durationMs: Date.now() - start,
            userId: String(user?._id),
        });

        next()
    } catch (error) {
        backendLogger.error({
            module: "auth.middleware",
            action: "AUTH_VERIFY_JWT",
            step: "END",
            status: "FAILURE",
            requestId,
            message: `[AUTH_VERIFY_JWT] END FAILURE`,
            durationMs: Date.now() - start,
            errorCode: "AUTH_ERROR",
            errorMessage: error?.message || "Invalid access token",
        });
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})