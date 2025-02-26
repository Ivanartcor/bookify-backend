import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/users/dto/update-password.dto';
import { CompaniesService } from 'src/companies/companies.service';



@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private companiesService: CompaniesService,
  ) { }

  // Método para validar el usuario (ya existente)
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      // Excluir campos sensibles (por ejemplo, password)
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // Método para loguear (generar el token)
  async login(user: any) {
    // Actualizamos el campo last_login
    await this.usersService.update(user.id, { last_login: new Date() });

    const payload = { username: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Método para registrar un usuario
  async register(createUserDto: CreateUserDto) {
    // Verificar si el usuario ya existe
    const existingUser = await this.usersService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }
    let user = await this.usersService.create(createUserDto);
    let company;

    // 📌 Si el usuario es una empresa, creamos la empresa automáticamente
    if (user.role === 'company') {
      company = await this.companiesService.create({
        name: user.name,  // Se usa el nombre del usuario como nombre de la empresa
        email: user.email,
        phone: user.phone || undefined,
        short_description: 'Nueva empresa registrada',
        logo: undefined,
        banner_image: undefined,
        website: undefined,
      });

      // Asignar el `companyId` al usuario
      user = await this.usersService.update(user.id, { company });
      //  Excluir la contraseña en la respuesta
      const { password, ...userWithoutPassword } = user;
      return { ...userWithoutPassword, company };
    }
  }


  // Método para actualizar la contraseña
  async updatePassword(userId: number, updatePasswordDto: UpdatePasswordDto): Promise<any> {
    // Primero, obtener el usuario
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    // Verificar la contraseña actual
    const isMatch = await bcrypt.compare(updatePasswordDto.currentPassword, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('La contraseña actual es incorrecta');
    }
    // Encriptar la nueva contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(updatePasswordDto.newPassword, saltRounds);
    // Actualizar el usuario
    await this.usersService.update(userId, { password: hashedPassword });
    // Opcional: Retornar un mensaje o el usuario sin contraseña
    return { message: 'Contraseña actualizada exitosamente' };
  }

}

