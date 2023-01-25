export const EnvConfig = () => ({
  environment: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  limit: process.env.LIMIT || 10,
  offset: process.env.OFFSET,
});
