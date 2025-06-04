import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class BlogService {
  async createBlog(data: {
    title: string;
    content: string;
    slug: string;
    image?: string;
    authorId: string;
  }) {
    return prisma.blog.create({
      data,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async getBlogs() {
    return prisma.blog.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async getBlogById(id: string) {
    return prisma.blog.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async getBlogBySlug(slug: string) {
    return prisma.blog.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async updateBlog(id: string, data: {
    title?: string;
    content?: string;
    slug?: string;
    image?: string;
    published?: boolean;
  }) {
    return prisma.blog.update({
      where: { id },
      data,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async deleteBlog(id: string) {
    return prisma.blog.delete({
      where: { id },
    });
  }
} 