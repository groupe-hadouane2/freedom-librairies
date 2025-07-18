const errorHandler = (err, req, res, next) => {
  console.error('❌ Error occurred:', err);

  // Default error
  let error = {
    message: err.message || 'Internal Server Error',
    status: err.status || 500
  };

  // Mongoose/MongoDB errors
  if (err.name === 'ValidationError') {
    error.message = Object.values(err.errors).map(e => e.message).join(', ');
    error.status = 400;
  }

  // JSON parsing errors
  if (err.type === 'entity.parse.failed') {
    error.message = 'Invalid JSON format';
    error.status = 400;
  }

  // File not found errors
  if (err.code === 'ENOENT') {
    error.message = 'Resource not found';
    error.status = 404;
  }

  // Send error response
  res.status(error.status).json({
    error: true,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;