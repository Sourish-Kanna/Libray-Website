const LEVELS = {
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
};

const nowIso = () => new Date().toISOString();

const sanitizeMeta = (meta = {}) => {
  if (!meta || typeof meta !== "object") return {};

  const blockedKeys = ["password", "token", "accessToken", "refreshToken", "authorization", "secret"];
  const sanitized = {};

  Object.entries(meta).forEach(([key, value]) => {
    const keyLower = String(key).toLowerCase();
    if (blockedKeys.some((blocked) => keyLower.includes(blocked))) {
      sanitized[key] = "[REDACTED]";
      return;
    }

    sanitized[key] = value;
  });

  return sanitized;
};

const writeLog = ({
  level = LEVELS.INFO,
  module,
  action,
  step,
  status,
  requestId = "n/a",
  message,
  durationMs,
  statusCode,
  userId,
  errorCode,
  errorMessage,
  meta,
}) => {
  const payload = {
    timestamp: nowIso(),
    level,
    service: "backend-api",
    module,
    action,
    step,
    status,
    requestId,
    message,
  };

  if (durationMs !== undefined) payload.durationMs = durationMs;
  if (statusCode !== undefined) payload.statusCode = statusCode;
  if (userId !== undefined) payload.userId = userId;
  if (errorCode !== undefined) payload.errorCode = errorCode;
  if (errorMessage !== undefined) payload.errorMessage = errorMessage;

  const sanitizedMeta = sanitizeMeta(meta);
  if (Object.keys(sanitizedMeta).length) payload.meta = sanitizedMeta;

  console.log(JSON.stringify(payload));
};

const backendLogger = {
  info: (data) => writeLog({ ...data, level: LEVELS.INFO }),
  warn: (data) => writeLog({ ...data, level: LEVELS.WARN }),
  error: (data) => writeLog({ ...data, level: LEVELS.ERROR }),
};

export { backendLogger };
