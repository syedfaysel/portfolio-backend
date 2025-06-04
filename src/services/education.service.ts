import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class EducationService {
  async createEducation(data: {
    institution: string;
    degree: string;
    field: string;
    startDate: Date;
    endDate?: Date;
    current?: boolean;
    location?: string;
  }) {
    return prisma.education.create({
      data,
    });
  }

  async getEducations() {
    return prisma.education.findMany({
      orderBy: {
        startDate: 'desc',
      },
    });
  }

  async getEducationById(id: string) {
    return prisma.education.findUnique({
      where: { id },
    });
  }

  async updateEducation(id: string, data: {
    institution?: string;
    degree?: string;
    field?: string;
    startDate?: Date;
    endDate?: Date;
    current?: boolean;
    location?: string;
  }) {
    return prisma.education.update({
      where: { id },
      data,
    });
  }

  async deleteEducation(id: string) {
    return prisma.education.delete({
      where: { id },
    });
  }
} 