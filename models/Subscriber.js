import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, default: '' },
  source: { type: String, default: 'Newsletter' },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] }
}, { timestamps: true });

export default mongoose.model('Subscriber', subscriberSchema);
