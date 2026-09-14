import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    updatedBy: {
      type: String,
      default: 'admin'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Content', contentSchema);
