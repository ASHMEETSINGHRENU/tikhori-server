import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false // Do not return password by default
    },
    name: {
      type: String,
      trim: true,
      default: function () {
        return this.username;
      }
    },
    phone: {
      type: String,
      trim: true,
      default: ''
    },
    companyOrStore: {
      type: String,
      trim: true,
      default: ''
    },
    city: {
      type: String,
      trim: true,
      default: ''
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'pending'],
      default: 'active'
    },
    notes: {
      type: String,
      default: ''
    },
    lastLogin: {
      type: Date
    }
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
