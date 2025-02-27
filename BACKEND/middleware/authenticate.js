
  const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  console.log('Request Headers:', req.headers);  // Log all headers


  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from header
  // const token = req.header('Authorization')?.split(' ')[1]; // Get token after 'Bearer'
  console.log('Token:', token);

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using your JWT secret
    // req.user = decoded.userId ; 
    req.user = decoded;

    console.log('Decoded User:', req.user);
    next();
     // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
