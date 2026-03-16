import { Controller } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  async create(body: CreateUserDto) {
    return this.usersService.create(body.name, body.age, body.designation);
  }

  async findAll() {
    return this.usersService.findAll();
  }

  async update(id: number, body: UpdateUserDto) {
    return this.usersService.update(
      id,
      body.name,
      body.age,
      body.designation,
    );
  }

  async delete(id: number) {
    return this.usersService.remove(id);
  }
}
