import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller';
import { auth, adminAuth } from '../middleware/auth.middleware';

const router = Router();
const projectController = new ProjectController();

// Public routes
router.get('/', projectController.getProjects);
router.get('/featured', projectController.getFeaturedProjects);
router.get('/:id', projectController.getProjectById);

// Protected routes
router.post('/', auth, projectController.createProject);
router.put('/:id', auth, projectController.updateProject);
router.delete('/:id', auth, projectController.deleteProject);

export default router; 