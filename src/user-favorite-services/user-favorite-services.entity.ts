import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Service } from '../services/service.entity';

@Entity({ name: 'user_favorite_services' })
export class UserFavoriteServices {
  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @PrimaryColumn({ name: 'service_id' })
  serviceId: number;

  // Relación con User
  @ManyToOne(() => User, (user) => user.favoriteServices, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Relación con Service
  @ManyToOne(() => Service, (service) => service.favoritedBy, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'service_id' })
  service: Service;
}
