import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';


@Controller('project')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Post('/addProject')
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Post('updateProject')
  update(@Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(updateProjectDto);
  }

  @Post('/getAllProject')
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }
   
  @Post('/deleteProject')
  removeSoft(@Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.delSoft(updateProjectDto);
    
  }

  @Post('getAllProjectPagination')
  async findAllCustomer(@Body() findAllCustomerDto) {
    
    try{
      return this.projectService.findAllProject(findAllCustomerDto,findAllCustomerDto.pagination)
    }
    catch(e){
      throw e
    }
  }
}
