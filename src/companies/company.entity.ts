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


}
