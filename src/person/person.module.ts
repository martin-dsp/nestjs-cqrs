import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/entities/person';
import { SavePersonCommand } from './commands/impl/save-person.command';
import { PersonController } from './person.controller';
import { GetPersonsHandler } from './queries/handlers/get-persons.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Person]), CqrsModule],
  controllers: [PersonController],
  providers: [GetPersonsHandler, SavePersonCommand],
})
export class PersonModule {}
