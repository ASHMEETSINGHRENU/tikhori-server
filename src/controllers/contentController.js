import Content from '../models/Content.js';

// GET /api/content (Public - all sections)
export const getAllContent = async (req, res, next) => {
  try {
    const contents = await Content.find();
    // Transform array into key-value map by section name
    const contentMap = {};
    contents.forEach((item) => {
      contentMap[item.section] = item.data;
    });

    return res.status(200).json({
      success: true,
      data: contentMap
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/content/:section (Public single section)
export const getContentBySection = async (req, res, next) => {
  try {
    const { section } = req.params;
    const content = await Content.findOne({ section });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: `Content for section '${section}' not found`
      });
    }

    return res.status(200).json({
      success: true,
      data: content.data
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/content/:section (Admin update single section)
export const updateSectionContent = async (req, res, next) => {
  try {
    const { section } = req.params;
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({
        success: false,
        message: 'Content data object is required'
      });
    }

    const content = await Content.findOneAndUpdate(
      { section },
      { data, updatedBy: req.admin?.email || 'admin' },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      success: true,
      message: `Section '${section}' updated successfully`,
      data: content.data
    });
  } catch (error) {
    next(error);
  }
};
