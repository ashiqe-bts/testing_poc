import { execSync } from 'node:child_process';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from './prisma.service';

describe('UsersController POC', () => {
  let controller: UsersController;
  let prisma: PrismaService;

  beforeAll(async () => {
    execSync('npx prisma db push --accept-data-loss --skip-generate', {
      stdio: 'ignore',
    });

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
    const dto = {
      name: 'John',
    };
    const user = await controller.create(dto);

    const users = await prisma.user.findMany();

    expect(user.name).toBe('John');
    expect(users.length).toBe(1);
  });

  it('should read users', async () => {
    await controller.create({
      name: 'Alice',
    });
    await controller.create({
      name: 'Bob',
    });

    const users = await controller.findAll();

    expect(users.length).toBe(2);
  });

  it('should update user', async () => {
    const user = await controller.create({
      name: 'OldName',
    });

    await controller.update({
      id: user.id,
      name: 'NewName',
    });

    const updated = await prisma.user.findUnique({ where: { id: user.id } });

    expect(updated?.name).toBe('NewName');
  });

  it('should delete user', async () => {
    const user = await controller.create({
      name: 'DeleteMe',
    });

    await controller.delete(user.id);

    const users = await prisma.user.findMany();

    expect(users.length).toBe(0);
  });
});
