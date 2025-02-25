import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Company } from 'src/companies/company.entity';



@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Obtiene todos los usuarios
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  // Obtiene un usuario por ID
  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
       where: { id }
       //, relations: ['company'], // Carga la relación con Company 
      });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Encriptar la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return await this.usersRepository.save(newUser);
  }

  // Actualiza un usuario existente
  async update(id: number, updateData: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, updateData);
    return await this.findOne(id);
  }

  // Elimina un usuario por ID
  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findEmployeesByCompany(companyId: number): Promise<User[]> {
    return await this.usersRepository.find({
      where: { company: { id: companyId }, role: 'employee' },
    });
  }
  
  async assignEmployeeToCompany(employeeId: number, companyId: number | null): Promise<User> {
    const employee = await this.usersRepository.findOne({ where: { id: employeeId, role: 'employee' } });
    if (!employee) throw new NotFoundException('Empleado no encontrado');
  
    employee.company = companyId ? await this.usersRepository.manager.findOne(Company, { where: { id: companyId } }) : null;
  
    return await this.usersRepository.save(employee);
  }
  
  
}



