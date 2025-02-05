import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Company } from 'src/companies/company.entity';// Asegúrate de tener esta entidad creada o ajusta la ruta
import { Appointment } from 'src/appointments/appointment.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  // Enum de roles: 'client', 'company', 'employee'
  @Column({ type: 'enum', enum: ['client', 'company', 'employee'] })
  role: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ type: 'text', nullable: true })
  profile_picture: string;

  @CreateDateColumn({ type: 'timestamp' })
  registered_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  last_login: Date;

  // Enum de estado: 'active', 'inactive', 'banned', 'deleted'
  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'banned', 'deleted'],
    default: 'active',
  })
  status: string;

  // Relación con Company. Se establece onDelete: SET NULL.
  @ManyToOne(() => Company, (company) => company.users, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToMany(() => Appointment, (appointment) => appointment.client)
  appointments: Appointment[];
}
