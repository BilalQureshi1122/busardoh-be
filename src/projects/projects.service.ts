import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { isEmpty } from 'rxjs/operators';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PaginationDto } from 'src/customer/dto/create-customer.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = new Project();
    project.name = createProjectDto.name;
    project.description = createProjectDto.description;
    project.startDate = createProjectDto.startDate;
    project.endDate = createProjectDto.endDate;
    project.income = createProjectDto.income;
    project.directCost = createProjectDto.directCost;
    project.profit = createProjectDto.profit;
    project.status = createProjectDto.status;
    project.dmlStatus = 1;
    project.insertionTimeStamp = Date();
    return this.projectRepo.save(project);
  }

  findAll(): Promise<Project[]> {
    return this.projectRepo.find();
  }

  update(updateProjectDto: UpdateProjectDto) {
    const project = new Project();
    project.name = updateProjectDto.name;
    project.description = updateProjectDto.description;
    project.startDate = updateProjectDto.startDate;
    project.endDate = updateProjectDto.endDate;
    project.income = updateProjectDto.income;
    project.directCost = updateProjectDto.directCost;
    project.profit = updateProjectDto.profit;
    project.status = updateProjectDto.status;
    (project.id = updateProjectDto.id), (project.dmlStatus = 2);
    project.lastUpdateTimeStamp = Date();
    return this.projectRepo.save(project);
  }

  async findOne(id: number) {
    const project = await this.projectRepo.findOne({
      where: {
        id,
        dmlStatus: Not(3),
      },
    });
    return project;
  }

  async delSoft(updateProjectDto: UpdateProjectDto) {
    let customer = new Project();
    customer = await this.findOne(updateProjectDto.id);
    customer.dmlStatus = 3;
    customer.closeTimeStamp = Date();
    return this.projectRepo.save(customer);
  }

  async findAllProject(params, pagination: PaginationDto) {
    const searchParams = params?.payload;
    console.log(params);
    let sql = '';
    if (searchParams?.name) {
      sql += ` project.name ilike '%${searchParams?.name}%' and `;
    }
    if (searchParams?.startDate) {
      sql += ` project.startDate ilike '%${searchParams?.startDate}%' and `;
    }
    if (searchParams?.endDate) {
      sql += ` project.endDate ilike '%${searchParams?.endDate}%' and `;
    }
    if (searchParams?.status) {
      sql += ` project.status ilike '%${searchParams?.status}%' and `;
    }

    sql += ` project.dmlStatus != 3 `;

    console.log('query', sql);
    const count = await this.projectRepo
      .createQueryBuilder('project')
      .where(sql)
      .getCount();

    sql += ` group by project.id order by project.id DESC  `;
    if (pagination && pagination?.pageNo >= 0 && pagination?.itemsPerPage > 0) {
      sql += ` OFFSET ${
        pagination?.pageNo * pagination?.itemsPerPage
      } ROWS FETCH NEXT ${pagination?.itemsPerPage} ROWS ONLY`;
    }

    const query = await this.projectRepo
      .createQueryBuilder('project')
      .where(sql)
      .getMany();
    return [query, count];
  }
}
