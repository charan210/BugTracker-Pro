// =========================================================
// AUTHENTICATION MIDDLEWARE
// =========================================================

const jwt = require("jsonwebtoken");


// =========================================================
// VERIFY JWT
// =========================================================

const authenticateToken = (req, res, next) => {

  // Get Authorization header
  const authHeader = req.headers.authorization;

  // Check whether token exists
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Authentication required."
    });
  }

  // Expected format:
  // Authorization: Bearer TOKEN

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Invalid authentication format."
    });
  }

  try {

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Attach user information to request
    req.user = decoded;

    // Continue to controller
    next();

  } catch (error) {

    return res.status(403).json({
      success: false,
      message: "Invalid or expired token."
    });

  }

};


module.exports = authenticateToken;