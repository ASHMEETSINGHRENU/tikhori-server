import Entrepreneur from '../models/Entrepreneur.js';

const parseJsonField = (field, fallback) => {
  if (typeof field === 'string') {
    try {
      return JSON.parse(field);
    } catch {
      return fallback;
    }
  }
  return field || fallback;
};

// GET /api/entrepreneurs (Public)
export const getPublicEntrepreneurs = async (req, res, next) => {
  try {
    const profiles = await Entrepreneur.find({ isActive: true }).sort({ sortOrder: 1, createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/entrepreneurs/admin/all (Admin)
export const getAllEntrepreneursAdmin = async (req, res, next) => {
  try {
    const profiles = await Entrepreneur.find().sort({ sortOrder: 1, createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/entrepreneurs/admin (Admin Create)
export const createEntrepreneur = async (req, res, next) => {
  try {
    const body = req.body;
    const businessName = parseJsonField(body.businessName, { en: '', hi: '' });
    const story = parseJsonField(body.story, { en: '', hi: '' });
    const journey = parseJsonField(body.journey, { en: '', hi: '' });
    const quote = parseJsonField(body.quote, { en: '', hi: '' });

    let photo = body.photo || '';
    if (req.file) {
      photo = `/uploads/${req.file.filename}`;
    }

    if (!body.name || !story.en) {
      return res.status(400).json({ success: false, message: 'Name and English story are required' });
    }

    const profile = await Entrepreneur.create({
      name: body.name,
      location: body.location || '',
      photo,
      businessName,
      story,
      journey,
      quote,
      isActive: body.isActive !== undefined ? body.isActive === true || body.isActive === 'true' : true,
      sortOrder: Number(body.sortOrder) || 0
    });

    return res.status(201).json({
      success: true,
      message: 'Entrepreneur profile created successfully',
      data: profile
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/entrepreneurs/admin/:id (Admin Update)
export const updateEntrepreneur = async (req, res, next) => {
  try {
    const profile = await Entrepreneur.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Entrepreneur profile not found' });
    }

    const body = req.body;

    if (body.name) profile.name = body.name;
    if (body.location !== undefined) profile.location = body.location;
    if (body.businessName) profile.businessName = parseJsonField(body.businessName, profile.businessName);
    if (body.story) profile.story = parseJsonField(body.story, profile.story);
    if (body.journey) profile.journey = parseJsonField(body.journey, profile.journey);
    if (body.quote) profile.quote = parseJsonField(body.quote, profile.quote);

    if (req.file) {
      profile.photo = `/uploads/${req.file.filename}`;
    } else if (body.photo) {
      profile.photo = body.photo;
    }

    if (body.isActive !== undefined) {
      profile.isActive = body.isActive === true || body.isActive === 'true';
    }
    if (body.sortOrder !== undefined) {
      profile.sortOrder = Number(body.sortOrder);
    }

    await profile.save();

    return res.status(200).json({
      success: true,
      message: 'Entrepreneur profile updated successfully',
      data: profile
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/entrepreneurs/admin/:id (Admin Delete)
export const deleteEntrepreneur = async (req, res, next) => {
  try {
    const profile = await Entrepreneur.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Entrepreneur profile not found' });
    }

    await profile.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Entrepreneur profile deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
