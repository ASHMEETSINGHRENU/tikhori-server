import mongoose from 'mongoose';

const stockistSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, default: '' },
  pincode: { type: String, required: true },
  phone: { type: String, default: '' },
  timings: { type: String, default: '9:30 AM - 9:00 PM' },
  status: { type: String, default: 'Active' }
}, { timestamps: true });

export default mongoose.model('Stockist', stockistSchema);
