import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TicketAttachmentsService } from './ticket-attachments.service';
import { TicketAttachment } from './ticket-attachment.entity';

@Controller('ticket-attachments')
export class TicketAttachmentsController {
  constructor(private ticketAttachmentsService: TicketAttachmentsService) {}

  // GET /ticket-attachments
  @Get()
  async getAll(): Promise<TicketAttachment[]> {
    return await this.ticketAttachmentsService.findAll();
  }

  // GET /ticket-attachments/:id
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<TicketAttachment> {
    return await this.ticketAttachmentsService.findOne(id);
  }

  // POST /ticket-attachments
  @Post()
  async create(@Body() data: Partial<TicketAttachment>): Promise<TicketAttachment> {
    return await this.ticketAttachmentsService.create(data);
  }

  // PUT /ticket-attachments/:id
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateData: Partial<TicketAttachment>): Promise<TicketAttachment> {
    return await this.ticketAttachmentsService.update(id, updateData);
  }

  // DELETE /ticket-attachments/:id
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.ticketAttachmentsService.remove(id);
  }
}
