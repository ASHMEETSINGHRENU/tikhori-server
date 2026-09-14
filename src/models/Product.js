import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true, trim: true },
      hi: { type: String, required: true, trim: true }
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    shortDescription: {
      en: { type: String, default: '' },
      hi: { type: String, default: '' }
    },
    description: {
      en: { type: String, default: '' },
      hi: { type: String, default: '' }
    },
    ingredients: {
      en: [{ type: String }],
      hi: [{ type: String }]
    },
    benefits: {
      en: [{ type: String }],
      hi: [{ type: String }]
    },
    usage: {
      en: { type: String, default: '' },
      hi: { type: String, default: '' }
    },
    storage: {
      en: { type: String, default: '' },
      hi: { type: String, default: '' }
    },
    packaging: {
      en: { type: String, default: '' },
      hi: { type: String, default: '' }
    },
    image: {
      type: String,
      required: true
    },
    gallery: [{
      type: String
    }],
    features: [{
      type: String
    }],
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

export default mongoose.model('Product', productSchema);
