import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { AssignorsService } from './assignors.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { AuthGuard } from '../guards/auth.guard';
import { Assignor } from '@prisma/client';

@ApiTags('integrations/assignor')
@Controller('integrations/assignor')
@UseGuards(AuthGuard)
export class AssignorsController {
  constructor(private readonly assignorsService: AssignorsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria os Cedentes' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 409, description: 'Conflict.' })
  async create(@Body() createAssignorDto: CreateAssignorDto) {
    return this.assignorsService.create(createAssignorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista os Cedente' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('pageSize', ParseIntPipe) pageSize: number = 10,
  ): Promise<Assignor[]> {
    return this.assignorsService.findAll(page, pageSize);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Filtra o cedente por id' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  async findOne(@Param('id') id: string) {
    return this.assignorsService.findOne(id);
  }
  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza o cedente' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 409, description: 'Conflict.' })
  async update(@Param('id') id: string, @Body() data: UpdateAssignorDto) {
    return this.assignorsService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui cedente' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  async remove(@Param('id') id: string) {
    return this.assignorsService.remove(id);
  }
}
