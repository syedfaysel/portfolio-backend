import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ProjectService {
  async createProject(data: {
    title: string;
    description: string;
    image?: string;
    liveUrl?: string;
    githubUrl?: string;
    technologies: string[];
    featured?: boolean;
  }) {
    return prisma.project.create({
      data,
    });
  }

  async getProjects() {
    return prisma.project.findMany();
  }

  async getProjectById(id: string) {
    return prisma.project.findUnique({
      where: { id },
    });
  }

  async getFeaturedProjects() {
    return prisma.project.findMany({
      where: { featured: true },
    });
  }

  async updateProject(id: string, data: {
    title?: string;
    description?: string;
    image?: string;
    liveUrl?: string;
    githubUrl?: string;
    technologies?: string[];
    featured?: boolean;
  }) {
    return prisma.project.update({
      where: { id },
      data,
    });
  }

  async deleteProject(id: string) {
    return prisma.project.delete({
      where: { id },
    });
  }
} 