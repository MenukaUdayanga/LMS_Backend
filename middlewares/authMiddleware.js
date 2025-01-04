const jwt = require('jsonwebtoken');
require("dotenv").config();

// Authentication Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  // Check if token is present in the request headers
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token is provided, return an error
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token using JWT_SECRET (stored in .env file)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user data (ID and email) to the request object
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Token verification failed
    console.error(error);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
