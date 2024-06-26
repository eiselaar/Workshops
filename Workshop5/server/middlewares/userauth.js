const { verifyToken } = require('../helpers/token');

/**
 * Middleware to verify user authentication through a JWT token.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Next middleware or route function.
 */
const checkUserAuth = async (req, res, next) => {
  try {
    const authToken = req.headers['authorization'].split(' ')[1]; // Get the authorization token from the request headers
    const tokenData = await verifyToken(authToken);
    if (tokenData.name && tokenData.exp) {
      const currentTimestamp = Math.floor(Date.now() / 1000); // Get the current timestamp in seconds

      if (currentTimestamp <= tokenData.exp) { // Compare the current timestamp with the token's expiration timestamp
        next(); // If the token is valid and not expired, continue to the next middleware or route
      } else {
        res.status(401).send({ error: 'Token expired' });
      }
    } else { // Return a 401 (Unauthorized) error if the token does not contain the necessary information
      res.status(401).send({ error: 'Unauthorized' });
    }
  } catch (e) { // Return a 401 (Unauthorized) error if there's an error during token verification
    res.status(401).send({ error: 'Unauthorized' });
  }
}

module.exports = checkUserAuth;