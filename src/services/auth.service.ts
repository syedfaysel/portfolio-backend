import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export class AuthService {
  async register(email: string, password: string, name: string) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const token = jwt.sign(  { 
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }, process.env.JWT_SECRET as string,
    { expiresIn: '24h' });
    return { user, token };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(  { 
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }, process.env.JWT_SECRET as string,
    { expiresIn: '24h' });
    return { user, token };
  }
} 