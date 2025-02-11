import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Address } from '../addresses/address.entity';

@Entity({ name: 'cities' })
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 50 })
  country: string;

  @Column({ length: 10 })
  zip_code: string;

  // Relación inversa: Una ciudad puede tener muchas direcciones
  @OneToMany(() => Address, (address) => address.city)
  addresses: Address[];
}
