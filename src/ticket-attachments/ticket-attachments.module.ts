import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketAttachment } from './ticket-attachment.entity';
import { TicketAttachmentsService } from './ticket-attachments.service';
import { TicketAttachmentsController } from './ticket-attachments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TicketAttachment])],
  providers: [TicketAttachmentsService],
  controllers: [TicketAttachmentsController],
  exports: [TicketAttachmentsService],
})
export class TicketAttachmentsModule {}
