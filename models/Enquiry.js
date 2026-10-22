import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  subject: { type: String, default: '' },
  message: { type: String, required: true },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] },
  status: { type: String, default: 'Unread' }
}, { timestamps: true });

export default mongoose.model('Enquiry', enquirySchema);
