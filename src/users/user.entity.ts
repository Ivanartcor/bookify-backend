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
import { AppointmentEmployee } from 'src/appointment-employees/appointment-employees.entity';
import { Review } from 'src/reviews/review.entity';
import { ReviewReply } from 'src/review-replies/review-reply.entity';
import { Notification } from 'src/notifications/notification.entity';
import { SupportTicket } from 'src/support-tickets/support-ticket.entity';
import { Address } from 'src/addresses/address.entity';
import { UserFavoriteCompanies } from 'src/user-favorite-companies/user-favorite-companies.entity';
import { UserFavoriteServices } from 'src/user-favorite-services/user-favorite-services.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255 })
  @Exclude()
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
    eager: true, // Carga automáticamente la relación
  })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToMany(() => Appointment, (appointment) => appointment.client)
  appointments: Appointment[];

  @OneToMany(() => AppointmentEmployee, (assignment) => assignment.employee)
  appointmentEmployees: AppointmentEmployee[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[]

  @OneToMany(() => ReviewReply, (reply) => reply.user)
  reviewReplies: ReviewReply[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];


  // Tickets creados por el usuario
  @OneToMany(() => SupportTicket, (ticket) => ticket.user)
  supportTickets: SupportTicket[];

  // Tickets asignados al usuario (como responsable de resolverlos)
  @OneToMany(() => SupportTicket, (ticket) => ticket.assigned_to)
  assignedSupportTickets: SupportTicket[];

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];


  @OneToMany(() => UserFavoriteCompanies, (favorite) => favorite.user)
  favoriteCompanies: UserFavoriteCompanies[];


  @OneToMany(() => UserFavoriteServices, (favorite) => favorite.user)
  favoriteServices: UserFavoriteServices[];

}
