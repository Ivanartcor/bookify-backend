import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Service } from 'src/services/service.entity';
import { Appointment } from 'src/appointments/appointment.entity';
import { CompanyCategory } from 'src/company-categories/company-categories.entity';
import { Review } from 'src/reviews/review.entity';
import { Notification } from 'src/notifications/notification.entity';
import { SupportTicket } from 'src/support-tickets/support-ticket.entity';
import { Address } from 'src/addresses/address.entity';
import { UserFavoriteCompanies } from 'src/user-favorite-companies/user-favorite-companies.entity';

@Entity({ name: 'companies' })
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column({ type: 'text', nullable: true })
    short_description: string;

    @Column({ type: 'text', nullable: true })
    logo: string;

    @Column({ type: 'text', nullable: true })
    banner_image: string;

    @Column({ length: 20, nullable: true })
    phone: string;

    @Column({ length: 255 })
    email: string;

    @Column({ length: 255, nullable: true })
    website: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    //  Si deseas conocer los usuarios asociados a la compañía
    @OneToMany(() => User, (user) => user.company)
    users: User[];

    @OneToMany(() => Service, (service) => service.company)
    services: Service[];

    @OneToMany(() => Appointment, (appointment) => appointment.company)
    appointments: Appointment[];

    @OneToMany(() => CompanyCategory, (companyCategory) => companyCategory.company)
    companyCategories: CompanyCategory[];

    // Relación inversa: Una compañía puede tener muchas reseñas
    @OneToMany(() => Review, (review) => review.company)
    reviews: Review[];

    @OneToMany(() => Notification, (notification) => notification.company)
notifications: Notification[];

  // Tickets asociados a la empresa
  @OneToMany(() => SupportTicket, (ticket) => ticket.company)
  supportTickets: SupportTicket[];


  @OneToMany(() => Address, (address) => address.company)
addresses: Address[];

@OneToMany(() => UserFavoriteCompanies, (favorite) => favorite.company)
favoritedBy: UserFavoriteCompanies[];

}
