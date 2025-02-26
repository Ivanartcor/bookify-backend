import { Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Service } from '../services/service.entity';

@Entity({ name: 'service_employees' })
export class ServiceEmployee {
  @PrimaryColumn()
  service_id: number;

  @PrimaryColumn()
  employee_id: number;

  @ManyToOne(() => Service, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id' })
  employee: User;
}
