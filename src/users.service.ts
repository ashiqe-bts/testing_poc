import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(name: string) {
    return this.prisma.user.create({
      data: { name },
      select: { id: true, name: true },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      select: { id: true, name: true },
    });
  }

  update(id: number, name: string) {
    return this.prisma.user.update({
      where: { id },
      data: { name },
      select: { id: true, name: true },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
      select: { id: true, name: true },
    });
  }
}
