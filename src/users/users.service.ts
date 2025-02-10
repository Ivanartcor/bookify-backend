import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

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
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Crea un nuevo usuario
  async create(userData: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(userData);
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
}
