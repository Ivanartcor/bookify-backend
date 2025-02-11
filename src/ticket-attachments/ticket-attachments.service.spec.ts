import { Test, TestingModule } from '@nestjs/testing';
import { TicketAttachmentsService } from './ticket-attachments.service';

describe('TicketAttachmentsService', () => {
  let service: TicketAttachmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketAttachmentsService],
    }).compile();

    service = module.get<TicketAttachmentsService>(TicketAttachmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
