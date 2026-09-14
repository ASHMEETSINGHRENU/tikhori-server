import slugify from 'slugify';
import Product from '../models/Product.js';

// Helper to parse JSON fields if sent as multipart form data
const parseJsonField = (field, fallback) => {
  if (typeof field === 'string') {
    try {
      return JSON.parse(field);
    } catch {
      return fallback;
    }
  }
  return field || fallback;
};

// GET /api/products (Public)
export const getPublicProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isActive: true }).sort({ sortOrder: 1, createdAt: 1 });
    return res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/products/slug/:slug (Public)
export const getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/products/admin/all (Admin)
export const getAllProductsAdmin = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ sortOrder: 1, createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/products/admin/:id (Admin)
export const getProductByIdAdmin = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// POST /api/products/admin (Admin Create)
export const createProduct = async (req, res, next) => {
  try {
    const body = req.body;

    const name = parseJsonField(body.name, { en: '', hi: '' });
    const shortDescription = parseJsonField(body.shortDescription, { en: '', hi: '' });
    const description = parseJsonField(body.description, { en: '', hi: '' });
    const ingredients = parseJsonField(body.ingredients, { en: [], hi: [] });
    const benefits = parseJsonField(body.benefits, { en: [], hi: [] });
    const usage = parseJsonField(body.usage, { en: '', hi: '' });
    const storage = parseJsonField(body.storage, { en: '', hi: '' });
    const packaging = parseJsonField(body.packaging, { en: '', hi: '' });
    const features = parseJsonField(body.features, []);

    let image = body.image || '';
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    if (!name.en) {
      return res.status(400).json({ success: false, message: 'Product English name is required' });
    }

    const generatedSlug = body.slug
      ? slugify(body.slug, { lower: true, strict: true })
      : slugify(name.en, { lower: true, strict: true });

    // Check if slug exists
    const existing = await Product.findOne({ slug: generatedSlug });
    const finalSlug = existing ? `${generatedSlug}-${Date.now()}` : generatedSlug;

    const newProduct = await Product.create({
      name,
      slug: finalSlug,
      shortDescription,
      description,
      ingredients,
      benefits,
      usage,
      storage,
      packaging,
      image,
      features,
      isActive: body.isActive !== undefined ? body.isActive === true || body.isActive === 'true' : true,
      sortOrder: Number(body.sortOrder) || 0
    });

    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/products/admin/:id (Admin Update)
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const body = req.body;

    if (body.name) product.name = parseJsonField(body.name, product.name);
    if (body.shortDescription) product.shortDescription = parseJsonField(body.shortDescription, product.shortDescription);
    if (body.description) product.description = parseJsonField(body.description, product.description);
    if (body.ingredients) product.ingredients = parseJsonField(body.ingredients, product.ingredients);
    if (body.benefits) product.benefits = parseJsonField(body.benefits, product.benefits);
    if (body.usage) product.usage = parseJsonField(body.usage, product.usage);
    if (body.storage) product.storage = parseJsonField(body.storage, product.storage);
    if (body.packaging) product.packaging = parseJsonField(body.packaging, product.packaging);
    if (body.features) product.features = parseJsonField(body.features, product.features);

    if (req.file) {
      product.image = `/uploads/${req.file.filename}`;
    } else if (body.image) {
      product.image = body.image;
    }

    if (body.slug && body.slug !== product.slug) {
      const customSlug = slugify(body.slug, { lower: true, strict: true });
      const duplicate = await Product.findOne({ slug: customSlug, _id: { $ne: product._id } });
      if (duplicate) {
        return res.status(400).json({ success: false, message: 'Slug already in use by another product' });
      }
      product.slug = customSlug;
    }

    if (body.isActive !== undefined) {
      product.isActive = body.isActive === true || body.isActive === 'true';
    }
    if (body.sortOrder !== undefined) {
      product.sortOrder = Number(body.sortOrder);
    }

    await product.save();

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/products/admin/:id (Admin Delete)
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await product.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/products/admin/:id/toggle (Admin Quick Toggle Active)
export const toggleProductStatus = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    product.isActive = !product.isActive;
    await product.save();

    return res.status(200).json({
      success: true,
      message: `Product ${product.isActive ? 'activated' : 'deactivated'}`,
      data: product
    });
  } catch (error) {
    next(error);
  }
};
