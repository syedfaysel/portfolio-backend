import { Router } from 'express';
import { SkillController } from '../controllers/skill.controller';
import { auth, adminAuth } from '../middleware/auth.middleware';

const router = Router();
const skillController = new SkillController();

// Public routes
router.get('/', skillController.getSkills);
router.get('/category/:category', skillController.getSkillsByCategory);
router.get('/:id', skillController.getSkillById);

// Protected routes
router.post('/', auth, skillController.createSkill);
router.put('/:id', auth, skillController.updateSkill);
router.delete('/:id', auth, skillController.deleteSkill);

export default router; 