import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PayableService } from './payable.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('integrations/payable')
@Controller('integrations/payable')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Post()
  @ApiOperation({ summary: 'Cria os Pagáveis' })
  create(@Body() data: CreatePayableDto) {
    return this.payableService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os Pagáveis' })
  findAll() {
    return this.payableService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Filtra um Pagável por id' })
  findOne(@Param('id') id: string) {
    return this.payableService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza o Pagável' })
  update(@Param('id') id: string, @Body() data: UpdatePayableDto) {
    return this.payableService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui o Pagável' })
  remove(@Param('id') id: string) {
    return this.payableService.remove(id);
  }
}
