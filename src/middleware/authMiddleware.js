import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import User from '../models/User.js';

export const protectAdmin = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tikhori_secret_key_super_secure_jwt_2026_masala');
      
      const admin = await Admin.findById(decoded.id).select('-password');
      if (!admin) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized: Admin account not found'
        });
      }

      req.admin = admin;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized: Token failed or expired'
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: 'Not authorized: No token provided'
    });
  }
};

export const protectUser = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tikhori_secret_key_super_secure_jwt_2026_masala');
      
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized: User account not found'
        });
      }

      if (user.status === 'inactive') {
        return res.status(403).json({
          success: false,
          message: 'Your account has been deactivated. Please contact support.'
        });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized: Token failed or expired'
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: 'Not authorized: No token provided'
    });
  }
};
