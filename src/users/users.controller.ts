import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from './dto/get-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }


  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getAuthenticatedUser(@GetUser() user: any): Promise<User> {
    // user.userId es extraído del token.
    return await this.usersService.findOne(user.userId);
  }


  // endpoint para actualizar el usuario autenticado
  @UseGuards(JwtAuthGuard)
  @Put('me')
  async updateAuthenticatedUser(
    @Body() updateData: Partial<User>,
    @GetUser() user: any,
  ): Promise<User> {
    const updatedUser = await this.usersService.update(user.userId, updateData);
    return plainToInstance(User, updatedUser); // Asegura que se devuelvan los datos actualizados
  }



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
  @UseGuards(JwtAuthGuard)
@Delete(':id')
async deleteUser(
  @Param('id') id: number,
  @GetUser() user: any,
): Promise<void> {
  const userToDelete = await this.usersService.findOne(id);
  
  // Permitir que un administrador elimine empleados de su empresa
  if (user.role === 'company' && userToDelete.company?.id === user.company?.id) {
    return await this.usersService.delete(id);
  }

  // Si no es admin de la empresa, solo puede eliminarse a sí mismo
  if (user.userId !== id) {
    throw new UnauthorizedException('No estás autorizado para eliminar este usuario');
  }

  return await this.usersService.delete(id);
}


  // Obtener todos los empleados de una empresa específica
@Get('company/:companyId/employees')
async getEmployeesByCompany(@Param('companyId') companyId: number): Promise<User[]> {
  return await this.usersService.findEmployeesByCompany(companyId);
}

@Put(':id/assign-company')
async assignEmployeeToCompany(
  @Param('id') employeeId: number,
  @Body() data: { companyId: number | null },
): Promise<User> {
  return await this.usersService.assignEmployeeToCompany(employeeId, data.companyId);
}


}
