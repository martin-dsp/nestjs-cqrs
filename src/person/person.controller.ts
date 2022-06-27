import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SavePersonCommand } from './commands/impl/save-person.command';
import { GetPersonsQuery } from './queries/impl/get-persons.query';

@Controller('person')
export class PersonController {
  // Inject 'QueryBus' instance that loads from cqrs
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('all')
  async getAll() {
    /*
     * Pass the instance of our 'Implementation Model' that is 'GetPersonQuery'
     * as input to the execute method of the 'QueryBus'
     * that will implicitly invoke our 'QueryHandler'.
     */
    return await this.queryBus.execute(new GetPersonsQuery());
  }

  @Post('add')
  @HttpCode(201)
  /* newPerson as a javascript object,
   * but our CommandBus expects class type.
   */
  @UsePipes(new ValidationPipe({ transform: true }))
  async createEmployee(@Body() newPerson: SavePersonCommand): Promise<any> {
    console.log('newPerson', newPerson);

    return await this.commandBus.execute(newPerson);
  }
}
