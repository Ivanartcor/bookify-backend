import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    Check,
    OneToMany,
  } from 'typeorm';
  import { User } from '../users/user.entity';
  import { Company } from '../companies/company.entity';
  import { Service } from '../services/service.entity';
import { ReviewImage } from 'src/review-images/review-image.entity';
import { ReviewReply } from 'src/review-replies/review-reply.entity';
  
  @Entity({ name: 'reviews' })
  // La siguiente cláusula CHECK se agrega para que la BD verifique la condición
  @Check(`("companyId" IS NOT NULL OR "serviceId" IS NOT NULL)`)
  export class Review {
    @PrimaryGeneratedColumn()
    id: number;
  
    // Relación: El autor de la reseña (obligatorio)
    @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    // Relación: La empresa reseñada (opcional)
    @ManyToOne(() => Company, (company) => company.reviews, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'company_id' })
    company: Company;
  
    // Relación: El servicio reseñado (opcional)
    @ManyToOne(() => Service, (service) => service.reviews, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'service_id' })
    service: Service;
  
    // Calificación entre 1 y 5 (con un decimal)
    @Column({ type: 'decimal', precision: 2, scale: 1 })
    rating: number;
  
    @Column({ type: 'text', nullable: true })
    comment: string;
  
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
  
    // Estado de la reseña: 'visible', 'reported', 'deleted'
    @Column({ type: 'enum', enum: ['visible', 'reported', 'deleted'], default: 'visible' })
    status: string;

    @OneToMany(() => ReviewImage, (reviewImage) => reviewImage.review)
    reviewImages: ReviewImage[];


@OneToMany(() => ReviewReply, (reply) => reply.review)
reviewReplies: ReviewReply[];

  }
  