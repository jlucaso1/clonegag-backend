import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class BaseDTO {
  @Field(() => Int)
  id: number;
  @FilterableField(() => GraphQLISODateTime)
  createdAt: Date;
  @FilterableField(() => GraphQLISODateTime)
  updatedAt: Date;
}
