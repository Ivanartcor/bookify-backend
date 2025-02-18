import { Controller, Post, Body, UnauthorizedException, UseGuards, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { GetUser } from 'src/users/dto/get-user.decorator';
import { UpdatePasswordDto } from 'src/users/dto/update-password.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }


   // Endpoint para actualizar la contraseña
   @UseGuards(JwtAuthGuard)
   @Put('update-password')
   async updatePassword(
     @Body() updatePasswordDto: UpdatePasswordDto,
     @GetUser() user: any,
   ) {
     return await this.authService.updatePassword(user.userId, updatePasswordDto);
   }
 }


