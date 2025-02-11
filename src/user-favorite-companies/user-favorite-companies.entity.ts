import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Company } from '../companies/company.entity';

@Entity({ name: 'user_favorite_companies' })
export class UserFavoriteCompanies {
  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @PrimaryColumn({ name: 'company_id' })
  companyId: number;

  // Relación: Cada entrada asocia un usuario a una empresa favorita.
  @ManyToOne(() => User, (user) => user.favoriteCompanies, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Company, (company) => company.favoritedBy, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
