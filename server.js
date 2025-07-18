require('dotenv').config();
const app = require('./src/app');
const config = require('./src/config');

const PORT = config.port;

// Start server
const server = app.listen(PORT, () => {
  console.log(`
🚀 Server is running!
📡 Environment: ${config.nodeEnv}
🌐 Port: ${PORT}
📚 API Base URL: http://localhost:${PORT}${config.apiPrefix}
📖 Health Check: http://localhost:${PORT}${config.apiPrefix}/health
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Process terminated');
    process.exit(0);
  });
});

module.exports = server;