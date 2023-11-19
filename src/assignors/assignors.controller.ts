import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { AssignorsService } from './assignors.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

@ApiTags('integrations/assignor')
@Controller('integrations/assignor')
export class AssignorsController {
  constructor(private readonly assignorsService: AssignorsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria os Cedentes' })
  @ApiResponse({ status: 409, description: 'Conflict.' })
  async create(@Body() createAssignorDto: CreateAssignorDto) {
    return this.assignorsService.create(createAssignorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista os Cedente' })
  async findAll() {
    return this.assignorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Filtra o cedente por id' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  async findOne(@Param('id') id: string) {
    return this.assignorsService.findOne(id);
  }
  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza o cedente' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 409, description: 'Conflict.' })
  async update(@Param('id') id: string, @Body() data: UpdateAssignorDto) {
    return this.assignorsService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui cedente' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  async remove(@Param('id') id: string) {
    return this.assignorsService.remove(id);
  }
}
