import mongoose from 'mongoose';

const entrepreneurSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    photo: {
      type: String,
      default: ''
    },
    businessName: {
      en: { type: String, default: '' },
      hi: { type: String, default: '' }
    },
    story: {
      en: { type: String, required: true },
      hi: { type: String, required: true }
    },
    journey: {
      en: { type: String, default: '' },
      hi: { type: String, default: '' }
    },
    quote: {
      en: { type: String, default: '' },
      hi: { type: String, default: '' }
    },
    isActive: {
      type: Boolean,
      default: true
    },
    sortOrder: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model('Entrepreneur', entrepreneurSchema);
