import { Router } from 'express';
import { EducationController } from '../controllers/education.controller';
import { auth, adminAuth } from '../middleware/auth.middleware';

const router = Router();
const educationController = new EducationController();

// Public routes
router.get('/', educationController.getEducations);
router.get('/:id', educationController.getEducationById);

// Protected routes
router.post('/', auth, educationController.createEducation);
router.put('/:id', auth, educationController.updateEducation);
router.delete('/:id', auth, educationController.deleteEducation);

export default router; 