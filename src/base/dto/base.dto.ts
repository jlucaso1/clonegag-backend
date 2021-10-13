import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class BaseDTO {
  @IDField(() => ID)
  id: number;
  @FilterableField(() => GraphQLISODateTime)
  createdAt: Date;
  @FilterableField(() => GraphQLISODateTime)
  updatedAt: Date;
}
