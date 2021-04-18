/**
 * Log an error message
 * @param {string} message The message to log
 * @param {Error} error The exception thrown
 * @param {...} args
 */
exports.error = function(message, error, ...args) {
  console.error(message, error, JSON.stringify(args));
  console.error(error.stack);
};