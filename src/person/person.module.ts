import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/entities/person';
import { PersonController } from './person.controller';
import { GetPersonsHandler } from './queries/handlers/get-persons.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [PersonController],
  providers: [GetPersonsHandler],
})
export class PersonModule {}
