import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PayableService } from './payable.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { BatchProducerService } from './jobs/batch-producer.service';

@ApiTags('integrations/payable')
@UseGuards(AuthGuard)
@Controller('integrations/payable')
export class PayableController {
  constructor(
    private readonly payableService: PayableService,
    private batchProducerService: BatchProducerService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria os Pagáveis' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 409, description: 'Conflict.' })
  create(@Body() data: CreatePayableDto) {
    return this.payableService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os Pagáveis' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll() {
    return this.payableService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Filtra um Pagável por id' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  findOne(@Param('id') id: string) {
    return this.payableService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza o Pagável' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 409, description: 'Conflict.' })
  update(@Param('id') id: string, @Body() data: UpdatePayableDto) {
    return this.payableService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui o Pagável' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  remove(@Param('id') id: string) {
    return this.payableService.remove(id);
  }

  @Post('batch')
  @ApiOperation({ summary: 'Cria vários pagáveis' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  batch(@Body() payableData: CreatePayableDto[]) {
    for (const payable of payableData) {
      this.batchProducerService.createPayable(payable);
    }
    return 'Processando';
  }
}
