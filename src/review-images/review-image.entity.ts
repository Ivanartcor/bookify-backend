import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Review } from '../reviews/review.entity';

@Entity({ name: 'review_images' })
export class ReviewImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  url: string;

  @Column({ length: 255, nullable: true })
  description: string;

  // Relación: Cada imagen pertenece a una reseña.
  @ManyToOne(() => Review, (review) => review.reviewImages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'review_id' })
  review: Review;
}
