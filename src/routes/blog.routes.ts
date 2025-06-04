import { Router } from 'express';
import { BlogController } from '../controllers/blog.controller';
import { auth, adminAuth } from '../middleware/auth.middleware';

const router = Router();
const blogController = new BlogController();

// Public routes
router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlogById);
router.get('/slug/:slug', blogController.getBlogBySlug);

// Protected routes
router.post('/', auth, blogController.createBlog);
router.put('/:id', auth, blogController.updateBlog);
router.delete('/:id', auth, blogController.deleteBlog);

export default router; 