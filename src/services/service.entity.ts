import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Company } from '../companies/company.entity';
import { Appointment } from 'src/appointments/appointment.entity';
import { Review } from 'src/reviews/review.entity';
import { Notification } from 'src/notifications/notification.entity';
import { ServiceAvailability } from 'src/service-availability/service-availability.entity';
import { UserFavoriteServices } from 'src/user-favorite-services/user-favorite-services.entity';

@Entity({ name: 'services' })
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  // Relación: Cada servicio pertenece a una compañía.
  @ManyToOne(() => Company, (company) => company.services, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  // ENUM: 'in_person', 'online', 'at_home'
  @Column({ type: 'enum', enum: ['in_person', 'online', 'at_home'] })
  type: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  duration_minutes: number;

  // ENUM: 'active', 'inactive', 'suspended'
  @Column({ type: 'enum', enum: ['active', 'inactive', 'suspended'], default: 'active' })
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  // Relación inversa: Los servicios pueden tener citas asociadas.
  @OneToMany(() => Appointment, (appointment) => appointment.service)
  appointments: Appointment[];

  @OneToMany(() => Review, (review) => review.service)
  reviews: Review[];

  @OneToMany(() => Notification, (notification) => notification.service)
notifications: Notification[];

@OneToMany(() => ServiceAvailability, (availability) => availability.service)
availabilities: ServiceAvailability[];


@OneToMany(() => UserFavoriteServices, (favorite) => favorite.service)
favoritedBy: UserFavoriteServices[];

}
