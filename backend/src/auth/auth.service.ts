import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async adminPasswordLogin(email: string, password: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    if (!password) {
      throw new BadRequestException('Password is required');
    }

    const admin = await this.prismaService.admin.finUnique({
      where: { email },
    });

    if (!admin) {
      throw new BadRequestException('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign({
      id: admin.id,
      email: admin.email,
      role: 'admin',
    });

    return accessToken;
  }
}
