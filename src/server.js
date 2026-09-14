import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import entrepreneurRoutes from './routes/entrepreneurRoutes.js';
import bannerRoutes from './routes/bannerRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import settingRoutes from './routes/settingRoutes.js';

// Resolve directory paths for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', process.env.CLIENT_URL].filter(Boolean),
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Serve uploaded static files
const uploadDir = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadDir));

// Serve initial assets if requested from backend
const assetDir = path.join(__dirname, '../../Assets');
app.use('/assets', express.static(assetDir));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Tikhori Foods API',
    uptime: process.uptime()
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/entrepreneurs', entrepreneurRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/settings', settingRoutes);

// In Production: Serve compiled frontend from client/dist if present
const clientDist = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDist));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads') || req.path.startsWith('/assets')) {
    return next();
  }
  const indexPath = path.join(clientDist, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(404).send('Tikhori Foods API is active. Frontend build not present.');
    }
  });
});

// Error Handling Middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`[Tikhori Foods Server]: Running on http://localhost:${PORT}`);
});

export default app;
