import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  hindiName: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  category: { type: String, default: 'Everyday Spices' },
  price: { type: Number, required: true },
  rating: { type: Number, default: 5.0 },
  reviewsCount: { type: Number, default: 1 },
  image: { type: String, default: '/assets/products/product-1.png' },
  badge: { type: String, default: '' },
  heatLevel: { type: String, default: '' },
  shortDescription: { type: String, default: '' },
  about: { type: String, default: '' },
  ingredients: [{ type: String }],
  howToUse: { type: String, default: '' },
  storage: { type: String, default: '' },
  weights: [
    {
      weight: { type: String },
      price: { type: Number },
      inStock: { type: Boolean, default: true }
    }
  ],
  inStock: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
