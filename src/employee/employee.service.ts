import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { EmployeeCreateDto } from './dto/create-employee.input';
import { ProjectService } from 'src/project/project.service';
import { Project } from 'src/project/entities/project.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private projectService: ProjectService,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();

    // const emp: Employee = new Employee();
    // emp.id = 'sdsdsd';
    // emp.firstName = 'aasaa';
    // emp.lastName = 'sdsdd';
    // emp.designation = 'sdsd';

    // return [emp];
  }

  async create(employee: EmployeeCreateDto): Promise<Employee> {
    const emp = this.employeeRepository.create(employee);
    return this.employeeRepository.save(emp);
  }

  async getProject(id: string): Promise<Project> {
    return this.projectService.findOne(id);
  }
}
