module.exports.auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authorization token missing' });
      }
    
      try {
        // Verify the token
        const decodedToken = verifyToken(token);
    
        // Attach the user data to the request object for further use in the route handlers
        req.user = decodedToken;
    
        // Proceed to the next middleware/route handler
        next();
      } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}
