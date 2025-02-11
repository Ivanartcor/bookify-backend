import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SupportTicket } from '../support-tickets/support-ticket.entity';

@Entity({ name: 'ticket_attachments' })
export class TicketAttachment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  file_name: string;

  @Column({ type: 'text' })
  file_url: string;

  // Relación: Cada adjunto pertenece a un ticket de soporte.
  @ManyToOne(() => SupportTicket, (ticket) => ticket.ticketAttachments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ticket_id' })
  ticket: SupportTicket;
}
