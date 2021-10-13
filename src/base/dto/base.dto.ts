import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { FilterableField, IDField } from '@nestjs-query/query-graphql';
@ObjectType()
export class BaseDTO {
  @IDField(() => ID)
  id: number;
  @FilterableField(() => GraphQLISODateTime)
  createdAt: Date;
  @FilterableField(() => GraphQLISODateTime)
  updatedAt: Date;
}
