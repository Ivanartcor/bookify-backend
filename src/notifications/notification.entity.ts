import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { User } from '../users/user.entity';
  import { Appointment } from '../appointments/appointment.entity';
  import { Service } from '../services/service.entity';
  import { Company } from '../companies/company.entity';
  
  @Entity({ name: 'notifications' })
  export class Notification {
    @PrimaryGeneratedColumn()
    id: number;
  
    // Relación obligatoria con User (a quien se envía la notificación)
    @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    // Relación opcional: Notificación asociada a una cita
    @ManyToOne(() => Appointment, (appointment) => appointment.notifications, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'appointment_id' })
    appointment: Appointment;
  
    // Relación opcional: Notificación asociada a un servicio
    @ManyToOne(() => Service, (service) => service.notifications, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'service_id' })
    service: Service;
  
    // Relación opcional: Notificación asociada a una empresa
    @ManyToOne(() => Company, (company) => company.notifications, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'company_id' })
    company: Company;
  
    @Column({ type: 'text' })
    message: string;
  
    // Enumerado para el tipo de notificación
    @Column({
      type: 'enum',
      enum: [
        'appointment_confirmation',
        'appointment_cancellation',
        'payment_reminder',
        'promotion',
        'general_info',
        'employee_assignment',
        'company_update',
      ],
    })
    type: string;
  
    // Enumerado para el estado de la notificación
    @Column({
      type: 'enum',
      enum: ['unread', 'read', 'archived'],
      default: 'unread',
    })
    status: string;
  
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
  }
  