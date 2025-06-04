import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ExperienceService {
  async createExperience(data: {
    company: string;
    position: string;
    location?: string;
    startDate: Date;
    endDate?: Date;
    current?: boolean;
    description: string;
  }) {
    return prisma.experience.create({
      data,
    });
  }

  async getExperiences() {
    return prisma.experience.findMany({
      orderBy: {
        startDate: 'desc',
      },
    });
  }

  async getExperienceById(id: string) {
    return prisma.experience.findUnique({
      where: { id },
    });
  }

  async updateExperience(id: string, data: {
    company?: string;
    position?: string;
    location?: string;
    startDate?: Date;
    endDate?: Date;
    current?: boolean;
    description?: string;
  }) {
    return prisma.experience.update({
      where: { id },
      data,
    });
  }

  async deleteExperience(id: string) {
    return prisma.experience.delete({
      where: { id },
    });
  }
} 