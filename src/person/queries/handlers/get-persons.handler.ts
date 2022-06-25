import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/entities/person';
import { Repository } from 'typeorm';
import { GetPersonsQuery } from '../impl/get-persons.query';

// cqrs를 로드하는 데코레이터
@QueryHandler(GetPersonsQuery)
export class GetPersonsHandler implements IQueryHandler<GetPersonsQuery> {
  constructor(
    // inject 'Person' table entity repository
    @InjectRepository(Person) private personRepo: Repository<Person>,
  ) {}

  // auto executed on invocation of our handler and to this method
  async execute(query: GetPersonsQuery): Promise<Person[]> {
    return await this.personRepo.find();
  }
}
