import Banner from '../models/Banner.js';

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

// GET /api/banners (Public active banners)
export const getActiveBanners = async (req, res, next) => {
  try {
    const now = new Date();
    const query = {
      isActive: true,
      $or: [
        { startDate: null, endDate: null },
        { startDate: { $lte: now }, endDate: null },
        { startDate: null, endDate: { $gte: now } },
        { startDate: { $lte: now }, endDate: { $gte: now } }
      ]
    };

    const banners = await Banner.find(query).sort({ sortOrder: 1, createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: banners.length,
      data: banners
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/banners/admin/all (Admin)
export const getAllBannersAdmin = async (req, res, next) => {
  try {
    const banners = await Banner.find().sort({ sortOrder: 1, createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: banners.length,
      data: banners
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/banners/admin (Admin Create)
export const createBanner = async (req, res, next) => {
  try {
    const body = req.body;
    const title = parseJsonField(body.title, { en: '', hi: '' });
    const subtitle = parseJsonField(body.subtitle, { en: '', hi: '' });
    const description = parseJsonField(body.description, { en: '', hi: '' });
    const ctaText = parseJsonField(body.ctaText, { en: 'Learn More', hi: 'और जानें' });
    const badge = parseJsonField(body.badge, { en: '', hi: '' });

    let image = body.image || '';
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    if (!title.en) {
      return res.status(400).json({ success: false, message: 'Banner English title is required' });
    }

    const banner = await Banner.create({
      title,
      subtitle,
      description,
      image: image || '/assets/products/product-1.png',
      ctaText,
      ctaLink: body.ctaLink || '#products',
      badge,
      isActive: body.isActive !== undefined ? body.isActive === true || body.isActive === 'true' : true,
      sortOrder: Number(body.sortOrder) || 0,
      startDate: body.startDate ? new Date(body.startDate) : null,
      endDate: body.endDate ? new Date(body.endDate) : null
    });

    return res.status(201).json({
      success: true,
      message: 'Banner created successfully',
      data: banner
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/banners/admin/:id (Admin Update)
export const updateBanner = async (req, res, next) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }

    const body = req.body;

    if (body.title) banner.title = parseJsonField(body.title, banner.title);
    if (body.subtitle) banner.subtitle = parseJsonField(body.subtitle, banner.subtitle);
    if (body.description) banner.description = parseJsonField(body.description, banner.description);
    if (body.ctaText) banner.ctaText = parseJsonField(body.ctaText, banner.ctaText);
    if (body.badge) banner.badge = parseJsonField(body.badge, banner.badge);
    if (body.ctaLink !== undefined) banner.ctaLink = body.ctaLink;

    if (req.file) {
      banner.image = `/uploads/${req.file.filename}`;
    } else if (body.image) {
      banner.image = body.image;
    }

    if (body.isActive !== undefined) {
      banner.isActive = body.isActive === true || body.isActive === 'true';
    }
    if (body.sortOrder !== undefined) {
      banner.sortOrder = Number(body.sortOrder);
    }
    if (body.startDate !== undefined) {
      banner.startDate = body.startDate ? new Date(body.startDate) : null;
    }
    if (body.endDate !== undefined) {
      banner.endDate = body.endDate ? new Date(body.endDate) : null;
    }

    await banner.save();

    return res.status(200).json({
      success: true,
      message: 'Banner updated successfully',
      data: banner
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/banners/admin/:id (Admin Delete)
export const deleteBanner = async (req, res, next) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }

    await banner.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Banner deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
