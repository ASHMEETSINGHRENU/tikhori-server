import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from './models/Product.js';
import Stockist from './models/Stockist.js';
import Order from './models/Order.js';
import Subscriber from './models/Subscriber.js';
import Enquiry from './models/Enquiry.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config();

const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    slug: 'lal-mirch-masala',
    name: 'Lal Mirch Masala',
    hindiName: 'लाल मिर्च मसाला',
    subtitle: 'Vibrant Colour & Signature Pungency',
    category: 'Everyday Spices',
    price: 145,
    rating: 4.9,
    reviewsCount: 128,
    image: '/assets/products/product-1.png',
    badge: 'Flagship Best Seller',
    heatLevel: 'Fiery (3/3)',
    shortDescription: 'Add vibrant colour and a distinctive chilli flavour to your everyday dishes with Lal Mirch Powder, a kitchen essential for curries, gravies, marinades, and traditional Indian recipes.',
    about: 'Tikhori Lal Mirch Powder is sourced directly from heritage chilli-growing regions of India. Every chilli is carefully destemmed by hand, sun-cured naturally, and ground at controlled low temperatures to retain its essential capsaicin, deep scarlet hue, and unmistakable aroma without artificial coloring.',
    ingredients: ['100% Stemless Premium Red Chillies', 'Naturally Sun-Dried', 'Zero Added Color or Preservatives'],
    howToUse: 'Add 1/2 to 1 teaspoon during tempering (tadka) with cumin, or whisk directly into marinades and simmering gravies.',
    storage: 'Store in an airtight ceramic or glass jar in a cool, dry pantry away from direct heat and sunlight.',
    weights: [
      { weight: '100g', price: 65, inStock: true },
      { weight: '250g', price: 145, inStock: true },
      { weight: '500g', price: 275, inStock: true },
      { weight: '1kg', price: 520, inStock: true }
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: 'prod-2',
    slug: 'haldi-powder',
    name: 'Haldi Powder',
    hindiName: 'हल्दी पाउडर',
    subtitle: 'High Curcumin Golden Salem Turmeric',
    category: 'Everyday Spices',
    price: 120,
    rating: 5.0,
    reviewsCount: 96,
    image: '/assets/products/product-2.png',
    badge: 'High Curcumin 5%+',
    heatLevel: 'Gentle & Healing',
    shortDescription: 'Bring warmth, golden colour, and earthy flavour to your cooking with Haldi Powder. A versatile ingredient for dals, curries, vegetables, and countless traditional dishes.',
    about: 'Our Haldi Powder is crafted from selected high-grade turmeric rhizomes known for their potent natural curcumin concentration.',
    ingredients: ['100% Pure Salem Turmeric Rhizomes', 'Natural Essential Curcuminoids', 'Zero Fillers'],
    howToUse: 'Add 1/4 to 1/2 teaspoon into sauteed vegetables, warm golden milk (haldi doodh), or lentils.',
    storage: 'Keep container tightly sealed in a dark, dry cupboard.',
    weights: [
      { weight: '100g', price: 55, inStock: true },
      { weight: '250g', price: 120, inStock: true },
      { weight: '500g', price: 230, inStock: true },
      { weight: '1kg', price: 440, inStock: true }
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: 'prod-3',
    slug: 'dhaniya-powder',
    name: 'Dhaniya Powder',
    hindiName: 'धनिया पाउडर',
    subtitle: 'Cold-Milled Coriander with Citrus Aromas',
    category: 'Everyday Spices',
    price: 110,
    rating: 4.8,
    reviewsCount: 84,
    image: '/assets/products/product-3.png',
    badge: 'Aromatic Reserve',
    heatLevel: 'Mellow (1/3)',
    shortDescription: 'Enjoy the distinctive aroma and mellow, citrusy notes of Dhaniya Powder. A versatile spice that adds depth and balance to curries, gravies, and homemade masalas.',
    about: 'Sourced from the finest green coriander seed harvests, Tikhori Dhaniya is gently roasted before cold-grinding.',
    ingredients: ['100% Handpicked Sun-Cured Coriander Seeds', 'Single-Origin Roasting'],
    howToUse: 'Combine with turmeric and red chilli in equal measures for standard gravies.',
    storage: 'Store sealed in a cool, moisture-free cabinet away from steam.',
    weights: [
      { weight: '100g', price: 50, inStock: true },
      { weight: '250g', price: 110, inStock: true },
      { weight: '500g', price: 210, inStock: true },
      { weight: '1kg', price: 400, inStock: true }
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: 'prod-4',
    slug: 'jeera-powder',
    name: 'Jeera Powder',
    hindiName: 'जीरा पाउडर',
    subtitle: 'Slow-Roasted Earthy Cumin Essence',
    category: 'Signature Blends',
    price: 195,
    rating: 4.9,
    reviewsCount: 112,
    image: '/assets/products/product-4.png',
    badge: 'Slow Roasted',
    heatLevel: 'Earthy Warmth',
    shortDescription: 'Bring a warm, earthy aroma to your kitchen with Jeera Powder. Ideal for dals, chaats, raitas, curries, and recipes that call for a distinctive cumin flavour.',
    about: 'Toasted in small artisanal batches on cast-iron plates until deep smoky perfection.',
    ingredients: ['100% Whole Cumin Seeds (Cuminum cyminum)', 'Artisanal Pan-Roasted'],
    howToUse: 'Sprinkle over fresh dahi, raita, chaat, roasted root vegetables, or butter tadka.',
    storage: 'Keep strictly sealed in an airtight tin.',
    weights: [
      { weight: '100g', price: 85, inStock: true },
      { weight: '250g', price: 195, inStock: true },
      { weight: '500g', price: 380, inStock: true },
      { weight: '1kg', price: 740, inStock: true }
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: 'prod-5',
    slug: 'kaala-masala',
    name: 'Heritage Kaala Masala',
    hindiName: 'काला मसाला',
    subtitle: 'Maharashtrian 21-Spice Royal Blend',
    category: 'Regional Flavours',
    price: 190,
    rating: 5.0,
    reviewsCount: 73,
    image: '/assets/products/product-4.png',
    badge: 'Artisanal Heritage',
    heatLevel: 'Complex & Deep',
    shortDescription: 'A revered Maharashtrian culinary secret made with 21 slow-charred spices, dagad phool, and roasted coconut for unforgettable rustic curries.',
    about: 'Crafted following an age-old family recipe with slow wood fires before grinding.',
    ingredients: ['Coriander', 'Dry Coconut', 'Black Cardamom', 'Cumin', 'Sesame', 'Dagad Phool', 'Cinnamon', 'Cloves'],
    howToUse: 'Use in traditional Usal, Misal, mutton rassa, egg curry, or bharli vangi.',
    storage: 'Keep refrigerated or in a cool airtight jar.',
    weights: [
      { weight: '100g', price: 85, inStock: true },
      { weight: '250g', price: 190, inStock: true },
      { weight: '500g', price: 360, inStock: true }
    ],
    inStock: true,
    isFeatured: false
  },
  {
    id: 'prod-6',
    slug: 'royal-kitchen-combo-pack',
    name: 'Royal Heritage Spice Quartet',
    hindiName: 'शाही मसाला संग्रह',
    subtitle: 'All 4 Flagship Essentials in Luxury Gift Box',
    category: 'Combo Packs',
    price: 520,
    rating: 5.0,
    reviewsCount: 164,
    image: '/assets/banners/Gemini_Generated_Image_ssi9gpssi9gpssi9.png',
    badge: 'Best Value Bundle',
    heatLevel: 'Complete Culinary Range',
    shortDescription: 'The ultimate kitchen companion featuring 250g each of Lal Mirch, Haldi, Dhaniya, and Slow-Roasted Jeera in a bespoke collectible pantry box.',
    about: 'Everything you need to master Indian cuisine in sealed multi-layer aroma barrier pouches.',
    ingredients: ['Lal Mirch 250g', 'Haldi Powder 250g', 'Dhaniya Powder 250g', 'Roasted Jeera Powder 250g'],
    howToUse: 'Use daily to bring restaurant-quality aroma to all recipes.',
    storage: 'Keep in original resealable pouches.',
    weights: [
      { weight: '4 x 250g Box', price: 520, inStock: true }
    ],
    inStock: true,
    isFeatured: true
  }
];

const INITIAL_STOCKISTS = [
  {
    id: 'st-1',
    name: 'Saraswati Gourmet Grocers',
    address: 'Shop 14, Heritage Square, Greater Kailash 1',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110048',
    phone: '+91 98112 34567',
    timings: '9:00 AM - 9:30 PM'
  },
  {
    id: 'st-2',
    name: 'Patanjali & Natural Organics Hub',
    address: '42, Bandra West Main Market, Turner Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    phone: '+91 98200 98765',
    timings: '10:00 AM - 10:00 PM'
  },
  {
    id: 'st-3',
    name: 'Annapurna Spice Emporium',
    address: '108, 100 Feet Road, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    phone: '+91 98450 11223',
    timings: '9:30 AM - 9:00 PM'
  },
  {
    id: 'st-4',
    name: 'Maharashtra Masala Bhandar',
    address: '56, FC Road, Deccan Gymkhana',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411004',
    phone: '+91 98501 44556',
    timings: '9:00 AM - 9:30 PM'
  }
];

export async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tikhori_foods_v2';
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri);
    }
    console.log('🌱 Connected to MongoDB for seeding...');

    // Seed Products if empty
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      await Product.insertMany(INITIAL_PRODUCTS);
      console.log(`✓ Seeded ${INITIAL_PRODUCTS.length} spices.`);
    }

    // Seed Stockists if empty
    const stockistCount = await Stockist.countDocuments();
    if (stockistCount === 0) {
      await Stockist.insertMany(INITIAL_STOCKISTS);
      console.log(`✓ Seeded ${INITIAL_STOCKISTS.length} stockist stores.`);
    }

    // Seed Sample Order if empty
    const orderCount = await Order.countDocuments();
    if (orderCount === 0) {
      await Order.create({
        id: 'TK-84920',
        customer: {
          name: 'Priyanka Sharma',
          email: 'priyanka.s@gmail.com',
          phone: '+91 98210 55432',
          address: 'Flat 402, Oakwood Heights, Powai',
          city: 'Mumbai',
          pincode: '400076'
        },
        items: [
          { id: 'prod-1', name: 'Lal Mirch Masala', weight: '250g', price: 145, quantity: 2 },
          { id: 'prod-2', name: 'Haldi Powder', weight: '250g', price: 120, quantity: 1 }
        ],
        subtotal: 410,
        shipping: 0,
        total: 410,
        status: 'Delivered',
        paymentMethod: 'UPI',
        date: '2026-10-20'
      });
      console.log('✓ Seeded sample order.');
    }

    // Seed Sample Subscriber if empty
    const subCount = await Subscriber.countDocuments();
    if (subCount === 0) {
      await Subscriber.create({
        id: 'sub-1',
        email: 'priyanka.s@gmail.com',
        name: 'Priyanka Sharma',
        source: 'Spice Club VIP'
      });
      console.log('✓ Seeded initial subscriber.');
    }

    console.log('🎉 Database seeding complete!');
  } catch (err) {
    console.error('Seeding notice (running in local storage fallback mode if Mongo offline):', err.message);
  }
}

if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  seedDatabase().then(() => process.exit(0));
}
