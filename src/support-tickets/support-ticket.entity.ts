import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from 'typeorm';
  import { ManyToOne, JoinColumn } from 'typeorm';
  import { User } from '../users/user.entity';
  import { Company } from '../companies/company.entity';
import { TicketAttachment } from 'src/ticket-attachments/ticket-attachment.entity';
  
  @Entity({ name: 'support_tickets' })
  export class SupportTicket {
    @PrimaryGeneratedColumn()
    id: number;
  
    // Usuario que abre el ticket (obligatorio)
    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    // Empresa a la que se asocia el ticket (opcional)
    @ManyToOne(() => Company, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'company_id' })
    company: Company;
  
    @Column({ length: 255 })
    subject: string;
  
    @Column({ type: 'text' })
    description: string;
  
    // Enumerado: 'bookings', 'billing', 'technical_issue', 'suggestion'
    @Column({
      type: 'enum',
      enum: ['bookings', 'billing', 'technical_issue', 'suggestion'],
    })
    category: string;
  
    // Enumerado: 'low', 'medium', 'high', 'critical'
    @Column({
      type: 'enum',
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'low',
    })
    priority: string;
  
    // Enumerado: 'open', 'in_progress', 'resolved', 'closed'
    @Column({
      type: 'enum',
      enum: ['open', 'in_progress', 'resolved', 'closed'],
      default: 'open',
    })
    status: string;
  
    // Usuario asignado para resolver el ticket (opcional)
    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'assigned_to' })
    assigned_to: User;
  
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
  
    // Fecha en la que se cierra el ticket (puede ser nula)
    @Column({ type: 'timestamp', nullable: true })
    closed_at: Date;

    @OneToMany(() => TicketAttachment, (attachment) => attachment.ticket)
ticketAttachments: TicketAttachment[];
  }
  