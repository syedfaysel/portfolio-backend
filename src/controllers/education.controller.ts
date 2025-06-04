import { Request, Response } from 'express';
import { EducationService } from '../services/education.service';

const educationService = new EducationService();

export class EducationController {
  async createEducation(req: Request, res: Response) {
    try {
      const { institution, degree, field, startDate, endDate, current, location } = req.body;
      const education = await educationService.createEducation({
        institution,
        degree,
        field,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : undefined,
        current,
        location,
      });
      res.status(201).json(education);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getEducations(req: Request, res: Response) {
    try {
      const educations = await educationService.getEducations();
      res.json(educations);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getEducationById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const education = await educationService.getEducationById(id);
      if (!education) {
        return res.status(404).json({ error: 'Education not found' });
      }
      res.json(education);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateEducation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { institution, degree, field, startDate, endDate, current, location } = req.body;
      const education = await educationService.updateEducation(id, {
        institution,
        degree,
        field,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        current,
        location,
      });
      res.json(education);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteEducation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await educationService.deleteEducation(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
} 