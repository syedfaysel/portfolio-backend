import { Router } from 'express';
import { ExperienceController } from '../controllers/experience.controller';
import { auth, adminAuth } from '../middleware/auth.middleware';

const router = Router();
const experienceController = new ExperienceController();

// Public routes
router.get('/', experienceController.getExperiences);
router.get('/:id', experienceController.getExperienceById);

// Protected routes
router.post('/', auth, experienceController.createExperience);
router.put('/:id', auth, experienceController.updateExperience);
router.delete('/:id', auth, experienceController.deleteExperience);

export default router; 