export default {
  secret: process.env.JWT_SECRET || 'fallback-secret',
  refresh_secret: process.env.JWT_SECRET_REFRESH || 'fallback-refresh-secret'
};
