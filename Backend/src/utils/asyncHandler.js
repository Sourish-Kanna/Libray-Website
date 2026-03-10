import { backendLogger } from "./logger.js";

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise
        .resolve(requestHandler(req, res, next))
        .catch((err) => {
            backendLogger.error({
                module: "asyncHandler",
                action: "REQUEST_LIFECYCLE",
                step: "END",
                status: "FAILURE",
                requestId: req?.requestId,
                message: `[REQUEST_LIFECYCLE] END FAILURE`,
                errorCode: "INTERNAL_ERROR",
                errorMessage: err?.message || "Unhandled async error",
                statusCode: err?.statusCode,
                meta: {
                    method: req?.method,
                    path: req?.originalUrl,
                },
            });
            next(err)
        })
    }
}


export { asyncHandler }