import ContactEnquiry from '../models/ContactEnquiry.js';

// POST /api/contact (Public submit enquiry)
export const submitContactEnquiry = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, subject, and message'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    const enquiry = await ContactEnquiry.create({
      name,
      email,
      phone: phone || '',
      subject,
      message
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out to Tikhori Foods. We will get in touch shortly!',
      data: {
        id: enquiry._id,
        name: enquiry.name
      }
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/contact/admin/all (Admin)
export const getAllEnquiriesAdmin = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const enquiries = await ContactEnquiry.find(query).sort({ createdAt: -1 });

    const counts = {
      total: await ContactEnquiry.countDocuments(),
      new: await ContactEnquiry.countDocuments({ status: 'new' }),
      read: await ContactEnquiry.countDocuments({ status: 'read' }),
      resolved: await ContactEnquiry.countDocuments({ status: 'resolved' })
    };

    return res.status(200).json({
      success: true,
      count: enquiries.length,
      counts,
      data: enquiries
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/contact/admin/:id/status (Admin)
export const updateEnquiryStatus = async (req, res, next) => {
  try {
    const { status, adminNotes } = req.body;
    const enquiry = await ContactEnquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    if (status) enquiry.status = status;
    if (adminNotes !== undefined) enquiry.adminNotes = adminNotes;

    await enquiry.save();

    return res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully',
      data: enquiry
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/contact/admin/:id (Admin)
export const deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await ContactEnquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    await enquiry.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
