import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Check,
  } from 'typeorm';
  import { City } from 'src/cities/city.entity';
  import { User } from '../users/user.entity';
  import { Company } from '../companies/company.entity';
  
  @Entity({ name: 'addresses' })
  @Check(`("userId" IS NOT NULL OR "companyId" IS NOT NULL)`)
  export class Address {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 100 })
    street: string;
  
    @Column({ length: 10 })
    number: string;
  
    // Relación obligatoria con City
    @ManyToOne(() => City, (city) => city.addresses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'city_id' })
    city: City;
  
    // Relación opcional con User
    @ManyToOne(() => User, (user) => user.addresses, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    // Relación opcional con Company
    @ManyToOne(() => Company, (company) => company.addresses, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'company_id' })
    company: Company;
  }
  