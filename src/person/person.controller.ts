import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetPersonsQuery } from './queries/impl/get-persons.query';

@Controller('person')
export class PersonController {
  // Inject 'QueryBus' instance that loads from cqrs
  constructor(private readonly queryBus: QueryBus) {}

  @Get('all')
  async getAll() {
    /*
     * Pass the instance of our 'Implementation Model' that is 'GetPersonQuery'
     * as input to the execute method of the 'QueryBus'
     * that will implicitly invoke our 'QueryHandler'.
     */
    return await this.queryBus.execute(new GetPersonsQuery());
  }
}
