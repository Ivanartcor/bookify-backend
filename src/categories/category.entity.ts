import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// Importamos la entidad que representa la relación (join table)
import { CompanyCategory } from 'src/company-categories/company-categories.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  // Relación inversa con la tabla de join (opcional, pero recomendable para navegar las asociaciones)
  @OneToMany(() => CompanyCategory, (companyCategory) => companyCategory.category)
  companyCategories: CompanyCategory[];
}
