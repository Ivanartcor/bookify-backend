import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Review } from '../reviews/review.entity';
import { User } from '../users/user.entity';

@Entity({ name: 'review_replies' })
export class ReviewReply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  comment: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  // Relación: La respuesta pertenece a una reseña.
  @ManyToOne(() => Review, (review) => review.reviewReplies, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'review_id' })
  review: Review;

  // Relación: La respuesta es realizada por un usuario.
  @ManyToOne(() => User, (user) => user.reviewReplies, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
