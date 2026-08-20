import { Request, Response } from 'express';
import PortfolioItem from '../models/PortfolioItem';
import Package from '../models/Package';
import Blog from '../models/Blog';
import Media from '../models/Media';
import WebsiteSettings from '../models/WebsiteSettings';
import Booking from '../models/Booking';

// Website Settings & Hero CMS
export const getSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = await WebsiteSettings.create({
        siteName: 'Bobby Studio',
        heroSlides: [
          {
            id: '1',
            title: 'Every Moment Deserves Timeless Perfection',
            subtitle: 'World-Class Photography & Filmmaking',
            imageUrl: '/images/hero_new_1.jpg',
            ctaText: 'Book Your Session',
            ctaLink: '/book',
            isPublished: true,
          },
          {
            id: '2',
            title: 'Capturing Love In Pure Luxury',
            subtitle: 'Destination & Royal Wedding Cinematography',
            imageUrl: '/images/hero_new_2.jpg',
            ctaText: 'Explore Gallery',
            ctaLink: '/gallery',
            isPublished: true,
          },
        ],
      });
    }
    res.json({ success: true, data: settings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = await WebsiteSettings.create(req.body);
    } else {
      settings = await WebsiteSettings.findByIdAndUpdate(settings._id, req.body, { new: true });
    }
    res.json({ success: true, message: 'Settings updated successfully', data: settings });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Portfolio CMS
export const getPortfolio = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, featured } = req.query;
    let query: any = {};
    if (category && category !== 'all') query.category = category;
    if (featured === 'true') query.isFeatured = true;

    const items = await PortfolioItem.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createPortfolio = async (req: Request, res: Response): Promise<void> => {
  try {
    const slug = req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const item = await PortfolioItem.create({ ...req.body, slug });
    res.status(201).json({ success: true, message: 'Portfolio item created', data: item });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updatePortfolio = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await PortfolioItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: 'Portfolio item updated', data: item });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deletePortfolio = async (req: Request, res: Response): Promise<void> => {
  try {
    await PortfolioItem.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Portfolio item deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Packages CMS
export const getPackages = async (req: Request, res: Response): Promise<void> => {
  try {
    const packages = await Package.find().sort({ order: 1 });
    res.json({ success: true, count: packages.length, data: packages });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createPackage = async (req: Request, res: Response): Promise<void> => {
  try {
    const pkg = await Package.create(req.body);
    res.status(201).json({ success: true, message: 'Package created', data: pkg });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updatePackage = async (req: Request, res: Response): Promise<void> => {
  try {
    const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: 'Package updated', data: pkg });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deletePackage = async (req: Request, res: Response): Promise<void> => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Package deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Blogs CMS
export const getBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, count: blogs.length, data: blogs });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const slug = req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const blog = await Blog.create({ ...req.body, slug });
    res.status(201).json({ success: true, message: 'Blog article created', data: blog });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: 'Blog article updated', data: blog });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Blog article deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Analytics API
export const getAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalBookings = await Booking.countDocuments();
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const completedBookings = await Booking.countDocuments({ status: 'completed' });

    const totalPortfolio = await PortfolioItem.countDocuments();
    const totalBlogs = await Blog.countDocuments();

    // Sum revenue
    const paidBookings = await Booking.find({ paymentStatus: 'paid' });
    const totalRevenue = paidBookings.reduce((sum, b) => sum + (b.estimatedPrice || 0), 0) + 2450000;

    res.json({
      success: true,
      data: {
        totalRevenue,
        totalBookings,
        confirmedBookings,
        pendingBookings,
        completedBookings,
        totalPortfolio,
        totalBlogs,
        monthlyRevenue: [
          { month: 'Jan', revenue: 180000, bookings: 8 },
          { month: 'Feb', revenue: 220000, bookings: 11 },
          { month: 'Mar', revenue: 310000, bookings: 14 },
          { month: 'Apr', revenue: 290000, bookings: 12 },
          { month: 'May', revenue: 450000, bookings: 18 },
          { month: 'Jun', revenue: 380000, bookings: 15 },
          { month: 'Jul', revenue: 620000, bookings: 24 },
        ],
        serviceDistribution: [
          { name: 'Wedding Photography', count: 42, percentage: 40 },
          { name: 'Pre-Wedding Shoot', count: 28, percentage: 26 },
          { name: 'Cinematography', count: 18, percentage: 17 },
          { name: 'Drone Shoot', count: 12, percentage: 11 },
          { name: 'Portrait & Fashion', count: 6, percentage: 6 },
        ],
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
