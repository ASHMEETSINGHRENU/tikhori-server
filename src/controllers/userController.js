import User from '../models/User.js';

// GET /api/users (Admin)
export const getUsers = async (req, res, next) => {
  try {
    const { search, status } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { username: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { companyOrStore: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/users (Admin create user/client)
export const createUser = async (req, res, next) => {
  try {
    const { username, name, email, password, phone, companyOrStore, city, status, notes } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const effectiveUsername = (username || email.split('@')[0]).toLowerCase().trim();
    const effectiveEmail = email.toLowerCase().trim();

    const existingEmail = await User.findOne({ email: effectiveEmail });
    if (existingEmail) {
      return res.status(400).json({ success: false, message: 'A user with this email already exists' });
    }

    const existingUsername = await User.findOne({ username: effectiveUsername });
    if (existingUsername) {
      return res.status(400).json({ success: false, message: 'Username is already taken' });
    }

    const user = await User.create({
      username: effectiveUsername,
      name: name || effectiveUsername,
      email: effectiveEmail,
      password: password || 'Tikhori@2026', // default fallback password if added by admin
      phone: phone || '',
      companyOrStore: companyOrStore || '',
      city: city || '',
      status: status || 'active',
      notes: notes || ''
    });

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/users/:id (Admin update user)
export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const { username, name, email, password, phone, companyOrStore, city, status, notes } = req.body;

    if (email && email.toLowerCase() !== user.email) {
      const duplicateEmail = await User.findOne({ email: email.toLowerCase(), _id: { $ne: user._id } });
      if (duplicateEmail) {
        return res.status(400).json({ success: false, message: 'Email already registered to another user' });
      }
      user.email = email.toLowerCase();
    }

    if (username && username.toLowerCase() !== user.username) {
      const duplicateUsername = await User.findOne({ username: username.toLowerCase(), _id: { $ne: user._id } });
      if (duplicateUsername) {
        return res.status(400).json({ success: false, message: 'Username already taken' });
      }
      user.username = username.toLowerCase().trim();
    }

    if (name !== undefined) user.name = name;
    if (password && password.trim().length >= 6) {
      user.password = password.trim();
    }
    if (phone !== undefined) user.phone = phone;
    if (companyOrStore !== undefined) user.companyOrStore = companyOrStore;
    if (city !== undefined) user.city = city;
    if (status) user.status = status;
    if (notes !== undefined) user.notes = notes;

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/users/:id (Admin delete user)
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    await user.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
