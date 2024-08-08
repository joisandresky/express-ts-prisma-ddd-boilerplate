export const app_config = {
  name: process.env.APP_NAME,
  port: process.env.APP_PORT || 3000,
  log_level: process.env.APP_LOG_LEVEL || "info",
};
