/**
 * @description Middleware functions that protect routes from unauthorized access
 * @exports protect
 * @requires jwt
 * @requires User
 */
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 * @description Protect routes from unauthorized access
 * @route GET /profile
 */
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by ID and exclude password
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401).json({ message: 'Token is invalid' });
    }
  } else {
    res.status(401).json({ message: 'No token, access denied' });
  }
};
