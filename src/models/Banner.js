import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true },
      hi: { type: String, required: true }
    },
    subtitle: {
      en: { type: String, default: '' },
      hi: { type: String, default: '' }
    },
    description: {
      en: { type: String, default: '' },
      hi: { type: String, default: '' }
    },
    image: {
      type: String,
      required: true
    },
    ctaText: {
      en: { type: String, default: 'Learn More' },
      hi: { type: String, default: 'और जानें' }
    },
    ctaLink: {
      type: String,
      default: '#products'
    },
    badge: {
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
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    }
  },
  { timestamps: true }
);

export default mongoose.model('Banner', bannerSchema);
