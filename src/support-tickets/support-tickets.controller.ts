import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SupportTicketsService } from './support-tickets.service';
import { SupportTicket } from './support-ticket.entity';

@Controller('support-tickets')
export class SupportTicketsController {
  constructor(private supportTicketsService: SupportTicketsService) {}

  // GET /support-tickets
  @Get()
  async getAll(): Promise<SupportTicket[]> {
    return await this.supportTicketsService.findAll();
  }

  // GET /support-tickets/:id
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<SupportTicket> {
    return await this.supportTicketsService.findOne(id);
  }

  // POST /support-tickets
  @Post()
  async create(@Body() ticketData: Partial<SupportTicket>): Promise<SupportTicket> {
    return await this.supportTicketsService.create(ticketData);
  }

  // PUT /support-tickets/:id
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<SupportTicket>,
  ): Promise<SupportTicket> {
    return await this.supportTicketsService.update(id, updateData);
  }

  // DELETE /support-tickets/:id
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.supportTicketsService.remove(id);
  }
}
