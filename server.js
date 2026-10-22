import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import Product from './models/Product.js';
import Order from './models/Order.js';
import Stockist from './models/Stockist.js';
import Enquiry from './models/Enquiry.js';
import Subscriber from './models/Subscriber.js';
import { seedDatabase } from './seed.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static assets from client/public/assets
const assetsPath = path.join(__dirname, '../client/public/assets');
app.use('/assets', express.static(assetsPath));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tikhori_foods_v2';

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB at:', MONGODB_URI);
    await seedDatabase();
  })
  .catch((err) => {
    console.warn('⚠️ MongoDB not connected; running server in fallback mode:', err.message);
  });

// --- API ROUTES ---

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    brand: 'Tikhori Foods',
    tagline: 'Spice Crafted Right',
    timestamp: new Date().toISOString()
  });
});

// 1. PRODUCTS
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const data = req.body;
    const newProduct = new Product({
      ...data,
      id: 'prod-' + Date.now(),
      slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const updated = await Product.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.params.id });
    res.json({ success: true, message: 'Spice removed from catalog' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. ORDERS
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = new Order({
      ...orderData,
      id: orderData.id || 'TK-' + Math.floor(10000 + Math.random() * 90000),
      date: new Date().toISOString().split('T')[0]
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.patch('/api/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Order.findOneAndUpdate({ id: req.params.id }, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3. STOCKISTS
app.get('/api/stockists', async (req, res) => {
  try {
    const stockists = await Stockist.find().sort({ createdAt: -1 });
    res.json(stockists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/stockists', async (req, res) => {
  try {
    const newStockist = new Stockist({
      ...req.body,
      id: 'st-' + Date.now()
    });
    await newStockist.save();
    res.status(201).json(newStockist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/stockists/:id', async (req, res) => {
  try {
    await Stockist.findOneAndDelete({ id: req.params.id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. CONTACT ENQUIRIES
app.get('/api/enquiries', async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/enquiries', async (req, res) => {
  try {
    const newEnquiry = new Enquiry({
      ...req.body,
      id: 'enq-' + Date.now(),
      date: new Date().toISOString().split('T')[0]
    });
    await newEnquiry.save();
    res.status(201).json(newEnquiry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 5. SUBSCRIBERS
app.get('/api/subscribers', async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/subscribers', async (req, res) => {
  try {
    const { email, name, source } = req.body;
    let subscriber = await Subscriber.findOne({ email });
    if (!subscriber) {
      subscriber = new Subscriber({
        id: 'sub-' + Date.now(),
        email,
        name: name || '',
        source: source || 'Newsletter',
        date: new Date().toISOString().split('T')[0]
      });
      await subscriber.save();
    }
    res.status(201).json({ success: true, subscriber });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Tikhori Server running on port ${PORT} (http://localhost:${PORT})`);
});
