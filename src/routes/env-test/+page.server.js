export async function load() {
  return {
    env: {
      MONGODB_URI: process.env.MONGODB_URI ? 'SET' : 'NOT SET',
      DB_NAME: process.env.DB_NAME || 'NOT SET',
      nodeEnv: process.env.NODE_ENV || 'NOT SET'
    }
  };
}