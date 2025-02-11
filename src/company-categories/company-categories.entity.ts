import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Company } from '../companies/company.entity';
import { Category } from '../categories/category.entity';

@Entity({ name: 'company_categories' })
export class CompanyCategory {
  @PrimaryColumn({ name: 'company_id' })
  companyId: number;

  @PrimaryColumn({ name: 'category_id' })
  categoryId: number;

  // Relación con Company
  @ManyToOne(() => Company, (company) => company.companyCategories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  // Relación con Category
  @ManyToOne(() => Category, (category) => category.companyCategories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
