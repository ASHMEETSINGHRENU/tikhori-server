import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      default: 'Tikhori Foods'
    },
    tagline: {
      en: { type: String, default: 'Spice Crafted Right' },
      hi: { type: String, default: 'स्वाद और शुद्धता का सही संगम' }
    },
    logo: {
      type: String,
      default: '/assets/logo/logo.png'
    },
    contactEmail: {
      type: String,
      default: 'care@tikhorifoods.com'
    },
    contactPhone: {
      type: String,
      default: '+91 98765 43210'
    },
    address: {
      en: { type: String, default: 'Plot 42, Spice Industrial Zone, Rural Enterprise Corridor, India' },
      hi: { type: String, default: 'प्लॉट 42, मसाला औद्योगिक क्षेत्र, ग्रामीण उद्यमिता कॉरिडोर, भारत' }
    },
    businessHours: {
      en: { type: String, default: 'Monday - Saturday: 9:00 AM - 6:00 PM IST' },
      hi: { type: String, default: 'सोमवार - शनिवार: सुबह 9:00 बजे से शाम 6:00 बजे तक' }
    },
    googleMapsUrl: {
      type: String,
      default: 'https://maps.google.com'
    },
    socialLinks: {
      facebook: { type: String, default: 'https://facebook.com' },
      instagram: { type: String, default: 'https://instagram.com' },
      twitter: { type: String, default: 'https://twitter.com' },
      youtube: { type: String, default: 'https://youtube.com' },
      linkedin: { type: String, default: 'https://linkedin.com' }
    },
    defaultLanguage: {
      type: String,
      enum: ['en', 'hi'],
      default: 'en'
    },
    websiteNotice: {
      en: { type: String, default: '' },
      hi: { type: String, default: '' },
      isActive: { type: Boolean, default: false }
    }
  },
  { timestamps: true }
);

export default mongoose.model('Setting', settingSchema);
