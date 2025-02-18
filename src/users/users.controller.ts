import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToInstance } from 'class-transformer';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // Endpoint para obtener todos los usuarios
  @Get()
  async getAllUsers(): Promise<User[]> {
    const users = await this.usersService.findAll();
    return plainToInstance(User, users)
  }

  // Endpoint para obtener un usuario por ID
  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    return plainToInstance(User, user);
  }

  // Endpoint para crear un nuevo usuario (ya se hace en auth/register)
  /*
  @Post()
  async createUser(@Body() userData: CreateUserDto): Promise<User> {
    return await this.usersService.create(userData);
  }
    */

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
