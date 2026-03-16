import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from './prisma.service';

describe('UsersController POC', () => {
  let controller: UsersController;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it('should create user', async () => {
    const dto = { name: 'John', age: 30, designation: 'Engineer' };
    const user = await controller.create(dto);

    const users = await prisma.user.findMany();

    expect(user.name).toBe('John');
    expect(user.age).toBe(30);
    expect(user.designation).toBe('Engineer');
    expect(users.length).toBe(1);
  });

  it('should read users', async () => {
    await controller.create({ name: 'Alice', age: 28, designation: 'Analyst' });
    await controller.create({ name: 'Bob', age: 35, designation: 'Manager' });

    const users = await controller.findAll();

    expect(users.length).toBe(2);
  });

  it('should update user', async () => {
    const user = await controller.create({
      name: 'OldName',
      age: 25,
      designation: 'Intern',
    });

    await controller.update({
      id: user.id,
      name: 'NewName',
      age: 26,
      designation: 'Associate',
    });

    const updated = await prisma.user.findUnique({ where: { id: user.id } });

    expect(updated?.name).toBe('NewName');
    expect(updated?.age).toBe(26);
    expect(updated?.designation).toBe('Associate');
  });

  it('should delete user', async () => {
    const user = await controller.create({
      name: 'DeleteMe',
      age: 31,
      designation: 'Consultant',
    });

    await controller.delete(user.id);

    const users = await prisma.user.findMany();

    expect(users.length).toBe(0);
  });
});
