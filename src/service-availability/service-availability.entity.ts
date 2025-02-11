import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Service } from '../services/service.entity';
  
  @Entity({ name: 'service_availability' })
  export class ServiceAvailability {
    @PrimaryGeneratedColumn()
    id: number;
  
    // Relación: Cada disponibilidad pertenece a un servicio
    @ManyToOne(() => Service, (service) => service.availabilities, {
      onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'service_id' })
    service: Service;
  
    // Día de la semana en el que se ofrece el servicio.
    // Se usa ENUM con los valores: 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
    @Column({
      type: 'enum',
      enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    })
    day_of_week: string;
  
    // Hora de inicio (tipo TIME)
    @Column({ type: 'time' })
    start_time: string;
  
    // Hora de fin (tipo TIME)
    @Column({ type: 'time' })
    end_time: string;
  }
  