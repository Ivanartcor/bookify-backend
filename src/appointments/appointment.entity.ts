import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Company } from '../companies/company.entity';
import { Service } from '../services/service.entity';
import { AppointmentEmployee } from 'src/appointment-employees/appointment-employees.entity';
import { Notification } from 'src/notifications/notification.entity';
import { IsDate } from 'class-validator';


@Entity({ name: 'appointments' })
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  // Relación: Cada cita tiene un cliente (usuario).
  @ManyToOne(() => User, (user) => user.appointments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' })
  client: User;

  // Relación: Cada cita pertenece a una compañía.
  @ManyToOne(() => Company, (company) => company.appointments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  // Relación: Cada cita corresponde a un servicio.
  @ManyToOne(() => Service, (service) => service.appointments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @Column({ type: 'timestamp' })
  
  appointment_date: Date;

  // ENUM: 'pending', 'confirmed', 'canceled', 'completed', 'rescheduled'
  @Column({ type: 'enum', enum: ['pending', 'confirmed', 'canceled', 'completed', 'rescheduled'], default: 'confirmed' })
  status: string;

  // ENUM: 'paid', 'pending', 'refunded'
  @Column({ type: 'enum', enum: ['paid', 'pending', 'refunded'], default: 'pending' })
  payment_status: string;

  // ENUM: 'credit_card', 'paypal', 'bank_transfer', 'cash'
  @Column({ type: 'enum', enum: ['credit_card', 'paypal', 'bank_transfer', 'cash'], nullable: true })
  payment_method: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modified_at: Date;

  @OneToMany(() => AppointmentEmployee, (assignment) => assignment.appointment)
  appointmentEmployees: AppointmentEmployee[];

  @OneToMany(() => Notification, (notification) => notification.appointment)
notifications: Notification[];
  appointment: Appointment;


}
