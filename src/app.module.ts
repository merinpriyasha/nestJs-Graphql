import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './project/project.module';
@Module({
  imports: [
    EmployeeModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // or your chosen username
      password: 'password', // your postgres password
      database: 'employee',
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true, // set to false in production
    }),
    ProjectModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
