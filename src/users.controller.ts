import { Controller } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  async create(dto: CreateUserDto) {
    return this.usersService.create(dto.name, dto.age, dto.designation);
  }

  async findAll() {
    return this.usersService.findAll();
  }

  async update(dto: UpdateUserDto) {
    return this.usersService.update(dto.id, dto.name, dto.age, dto.designation);
  }

  async delete(id: number) {
    return this.usersService.remove(id);
  }
}
