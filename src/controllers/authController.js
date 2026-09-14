import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import User from '../models/User.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'tikhori_secret_key_super_secure_jwt_2026_masala', {
    expiresIn: '30d'
  });
};

// ==================== ADMIN AUTH ====================

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    admin.lastLogin = new Date();
    await admin.save({ validateBeforeSave: false });

    return res.status(200).json({
      success: true,
      message: 'Admin login successful',
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminProfile = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      data: req.admin
    });
  } catch (error) {
    next(error);
  }
};

export const updateAdminPassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }

    admin.password = newPassword;
    await admin.save();

    return res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// ==================== USER AUTH ====================

// POST /api/auth/register
export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password, name, phone } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide username, email, and password'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    const normalizedUsername = username.toLowerCase().trim();
    const normalizedEmail = email.toLowerCase().trim();

    // Check if username already exists
    const existingUsername = await User.findOne({ username: normalizedUsername });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: 'Username is already taken. Please choose another.'
      });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email: normalizedEmail });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists.'
      });
    }

    const user = await User.create({
      username: normalizedUsername,
      email: normalizedEmail,
      password,
      name: name?.trim() || normalizedUsername,
      phone: phone?.trim() || '',
      status: 'active'
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: 'Registration successful! Welcome to Tikhori Foods.',
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        status: user.status,
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/user-login
export const loginUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const rawIdentifier = (email || username || '').trim();

    if (!rawIdentifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your email or username, and password.'
      });
    }

    const normalizedIdentifier = rawIdentifier.toLowerCase();

    // Query user by email OR username (case-insensitive)
    const user = await User.findOne({
      $or: [
        { email: normalizedIdentifier },
        { username: normalizedIdentifier }
      ]
    }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email/username or password. Please check your credentials.'
      });
    }

    if (user.status === 'inactive') {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated. Please contact support.'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email/username or password. Please check your credentials.'
      });
    }

    // Safely update lastLogin timestamp without triggering Mongoose save/password middleware
    await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        phone: user.phone || '',
        companyOrStore: user.companyOrStore || '',
        city: user.city || '',
        status: user.status,
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/user-me
export const getUserProfile = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      data: req.user
    });
  } catch (error) {
    next(error);
  }
};
