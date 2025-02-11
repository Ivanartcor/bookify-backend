import { Test, TestingModule } from '@nestjs/testing';
import { TicketAttachmentsController } from './ticket-attachments.controller';

describe('TicketAttachmentsController', () => {
  let controller: TicketAttachmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketAttachmentsController],
    }).compile();

    controller = module.get<TicketAttachmentsController>(TicketAttachmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
