import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class SkillService {
  async createSkill(data: {
    name: string;
    category: string;
    level?: number;
  }) {
    return prisma.skill.create({
      data,
    });
  }

  async getSkills() {
    return prisma.skill.findMany({
      orderBy: {
        category: 'asc',
      },
    });
  }

  async getSkillsByCategory(category: string) {
    return prisma.skill.findMany({
      where: { category },
      orderBy: {
        level: 'desc',
      },
    });
  }

  async getSkillById(id: string) {
    return prisma.skill.findUnique({
      where: { id },
    });
  }

  async updateSkill(id: string, data: {
    name?: string;
    category?: string;
    level?: number;
  }) {
    return prisma.skill.update({
      where: { id },
      data,
    });
  }

  async deleteSkill(id: string) {
    return prisma.skill.delete({
      where: { id },
    });
  }
} 