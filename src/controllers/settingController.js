import Setting from '../models/Setting.js';

// GET /api/settings (Public)
export const getSettings = async (req, res, next) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({});
    }
    return res.status(200).json({
      success: true,
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/settings (Admin)
export const updateSettings = async (req, res, next) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = new Setting();
    }

    const body = req.body;

    if (body.brandName !== undefined) settings.brandName = body.brandName;
    if (body.tagline !== undefined) settings.tagline = body.tagline;
    if (body.logo !== undefined) settings.logo = body.logo;
    if (body.contactEmail !== undefined) settings.contactEmail = body.contactEmail;
    if (body.contactPhone !== undefined) settings.contactPhone = body.contactPhone;
    if (body.address !== undefined) settings.address = body.address;
    if (body.businessHours !== undefined) settings.businessHours = body.businessHours;
    if (body.googleMapsUrl !== undefined) settings.googleMapsUrl = body.googleMapsUrl;
    if (body.socialLinks !== undefined) settings.socialLinks = body.socialLinks;
    if (body.defaultLanguage !== undefined) settings.defaultLanguage = body.defaultLanguage;
    if (body.websiteNotice !== undefined) settings.websiteNotice = body.websiteNotice;

    await settings.save();

    return res.status(200).json({
      success: true,
      message: 'Settings updated successfully',
      data: settings
    });
  } catch (error) {
    next(error);
  }
};
