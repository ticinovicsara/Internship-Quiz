import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { runInThisContext } from 'vm';
import passport from 'passport';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: { username: string; email: string; password: string }) {
    const hashedPass = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: { ...data, password: hashedPass, role: 'Player' },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
