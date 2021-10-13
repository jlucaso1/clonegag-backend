import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class DeletePostOutput {
  @Field()
  message: string;
  @Field()
  success: boolean;
}
