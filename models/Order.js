import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, default: '' },
    pincode: { type: String, required: true }
  },
  items: [
    {
      id: { type: String },
      name: { type: String },
      weight: { type: String },
      price: { type: Number },
      quantity: { type: Number }
    }
  ],
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  shipping: { type: Number, default: 0 },
  total: { type: Number, required: true },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Processing', 'Shipped', 'Delivered'] },
  paymentMethod: { type: String, default: 'UPI' },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
