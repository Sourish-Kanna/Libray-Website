const LEVELS = {
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
};

const SESSION_KEY = "frontend-session-id";

const nowIso = () => new Date().toISOString();

const getSessionId = () => {
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
};

const generateActionId = (prefix = "action") => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
};

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

    if (keyLower === "email" && typeof value === "string" && value.includes("@")) {
      const [, domain] = value.split("@");
      sanitized[key] = `***@${domain}`;
      return;
    }

    sanitized[key] = value;
  });

  return sanitized;
};

const writeLog = ({
  level = LEVELS.INFO,
  screenOrStore,
  action,
  step,
  status,
  actionId,
  message,
  durationMs,
  endpoint,
  method,
  statusCode,
  errorCode,
  errorMessage,
  meta,
}) => {
  const payload = {
    timestamp: nowIso(),
    level,
    app: "frontend-web",
    screenOrStore,
    action,
    step,
    status,
    sessionId: getSessionId(),
    actionId,
    message,
  };

  if (durationMs !== undefined) payload.durationMs = durationMs;
  if (endpoint !== undefined) payload.endpoint = endpoint;
  if (method !== undefined) payload.method = method;
  if (statusCode !== undefined) payload.statusCode = statusCode;
  if (errorCode !== undefined) payload.errorCode = errorCode;
  if (errorMessage !== undefined) payload.errorMessage = errorMessage;

  const sanitizedMeta = sanitizeMeta(meta);
  if (Object.keys(sanitizedMeta).length) payload.meta = sanitizedMeta;

  console.log(JSON.stringify(payload));
};

const frontendLogger = {
  info: (data) => writeLog({ ...data, level: LEVELS.INFO }),
  warn: (data) => writeLog({ ...data, level: LEVELS.WARN }),
  error: (data) => writeLog({ ...data, level: LEVELS.ERROR }),
};

export { frontendLogger, generateActionId, getSessionId };
