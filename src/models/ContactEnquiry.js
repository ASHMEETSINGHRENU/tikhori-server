import mongoose from 'mongoose';

const contactEnquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      trim: true,
      default: ''
    },
    subject: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ['new', 'read', 'resolved'],
      default: 'new'
    },
    adminNotes: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

export default mongoose.model('ContactEnquiry', contactEnquirySchema);
