import { Router } from 'express';
import {
  getSettings,
  updateSettings,
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  getPackages,
  createPackage,
  updatePackage,
  deletePackage,
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getAnalytics,
} from '../controllers/cms.controller';

const router = Router();

// Website Settings
router.get('/settings', getSettings);
router.put('/settings', updateSettings);

// Portfolio
router.get('/portfolio', getPortfolio);
router.post('/portfolio', createPortfolio);
router.put('/portfolio/:id', updatePortfolio);
router.delete('/portfolio/:id', deletePortfolio);

// Packages
router.get('/packages', getPackages);
router.post('/packages', createPackage);
router.put('/packages/:id', updatePackage);
router.delete('/packages/:id', deletePackage);

// Blogs
router.get('/blogs', getBlogs);
router.post('/blogs', createBlog);
router.put('/blogs/:id', updateBlog);
router.delete('/blogs/:id', deleteBlog);

// Analytics
router.get('/analytics', getAnalytics);

export default router;
