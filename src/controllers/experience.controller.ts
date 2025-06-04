import { Request, Response } from 'express';
import { ExperienceService } from '../services/experience.service';

const experienceService = new ExperienceService();

export class ExperienceController {
  async createExperience(req: Request, res: Response) {
    try {
      const { company, position, location, startDate, endDate, current, description } = req.body;
      const experience = await experienceService.createExperience({
        company,
        position,
        location,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : undefined,
        current,
        description,
      });
      res.status(201).json(experience);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getExperiences(req: Request, res: Response) {
    try {
      const experiences = await experienceService.getExperiences();
      res.json(experiences);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getExperienceById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const experience = await experienceService.getExperienceById(id);
      if (!experience) {
        return res.status(404).json({ error: 'Experience not found' });
      }
      res.json(experience);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateExperience(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { company, position, location, startDate, endDate, current, description } = req.body;
      const experience = await experienceService.updateExperience(id, {
        company,
        position,
        location,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        current,
        description,
      });
      res.json(experience);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteExperience(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await experienceService.deleteExperience(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
} 