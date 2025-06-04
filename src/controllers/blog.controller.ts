import { Request, Response } from 'express';
import { BlogService } from '../services/blog.service';

const blogService = new BlogService();

export class BlogController {
  async createBlog(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const { title, content, slug, image } = req.body;
      const authorId = req.user.id;
      const blog = await blogService.createBlog({
        title,
        content,
        slug,
        image,
        authorId,
      });
      res.status(201).json(blog);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getBlogs(req: Request, res: Response) {
    try {
      const blogs = await blogService.getBlogs();
      res.json(blogs);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getBlogById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const blog = await blogService.getBlogById(id);
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      res.json(blog);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getBlogBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const blog = await blogService.getBlogBySlug(slug);
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      res.json(blog);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateBlog(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, content, slug, image, published } = req.body;
      const blog = await blogService.updateBlog(id, {
        title,
        content,
        slug,
        image,
        published,
      });
      res.json(blog);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteBlog(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await blogService.deleteBlog(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
} 