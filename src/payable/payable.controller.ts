import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PayableService } from './payable.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';

@ApiTags('integrations/payable')
@UseGuards(AuthGuard)
@Controller('integrations/payable')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

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
  async findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('pageSize', ParseIntPipe) pageSize: number = 10,
  ) {
    return this.payableService.findAll(page, pageSize);
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
}
