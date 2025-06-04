import { Request, Response } from 'express';
import { ProjectService } from '../services/project.service';

const projectService = new ProjectService();

export class ProjectController {
  async createProject(req: Request, res: Response) {
    try {
      const { title, description, image, liveUrl, githubUrl, technologies, featured } = req.body;
      const project = await projectService.createProject({
        title,
        description,
        image,
        liveUrl,
        githubUrl,
        technologies,
        featured,
      });
      res.status(201).json(project);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getProjects(req: Request, res: Response) {
    try {
      const projects = await projectService.getProjects();
      res.json(projects);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getProjectById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const project = await projectService.getProjectById(id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.json(project);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getFeaturedProjects(req: Request, res: Response) {
    try {
      const projects = await projectService.getFeaturedProjects();
      res.json(projects);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateProject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, image, liveUrl, githubUrl, technologies, featured } = req.body;
      const project = await projectService.updateProject(id, {
        title,
        description,
        image,
        liveUrl,
        githubUrl,
        technologies,
        featured,
      });
      res.json(project);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteProject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await projectService.deleteProject(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
} 