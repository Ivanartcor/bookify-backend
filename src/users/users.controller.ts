import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // Endpoint para obtener todos los usuarios
  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  // Endpoint para obtener un usuario por ID
  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User> {
    return await this.usersService.findOne(id);
  }

  // Endpoint para crear un nuevo usuario
  @Post()
  async createUser(@Body() userData: Partial<User>): Promise<User> {
    return await this.usersService.create(userData);
  }

  // Endpoint para actualizar un usuario
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateData: Partial<User>,
  ): Promise<User> {
    return await this.usersService.update(id, updateData);
  }

  // Endpoint para eliminar un usuario
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return await this.usersService.delete(id);
  }
}
