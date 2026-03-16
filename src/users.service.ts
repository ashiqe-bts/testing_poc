import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(name: string, age: number, designation: string, email: string) {
    return this.prisma.user.create({
      data: { name, age, designation, email },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  update(id: number, name: string, age: number, designation: string, email: string) {
    return this.prisma.user.update({
      where: { id },
      data: { name, age, designation, email },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
