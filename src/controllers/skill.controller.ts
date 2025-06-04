import { Request, Response } from 'express';
import { SkillService } from '../services/skill.service';

const skillService = new SkillService();

export class SkillController {
  async createSkill(req: Request, res: Response) {
    try {
      const { name, category, level } = req.body;
      const skill = await skillService.createSkill({
        name,
        category,
        level,
      });
      res.status(201).json(skill);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getSkills(req: Request, res: Response) {
    try {
      const skills = await skillService.getSkills();
      res.json(skills);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getSkillsByCategory(req: Request, res: Response) {
    try {
      const { category } = req.params;
      const skills = await skillService.getSkillsByCategory(category);
      res.json(skills);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getSkillById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const skill = await skillService.getSkillById(id);
      if (!skill) {
        return res.status(404).json({ error: 'Skill not found' });
      }
      res.json(skill);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateSkill(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, category, level } = req.body;
      const skill = await skillService.updateSkill(id, {
        name,
        category,
        level,
      });
      res.json(skill);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteSkill(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await skillService.deleteSkill(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
} 