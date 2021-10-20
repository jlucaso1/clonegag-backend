import { UserInputError } from '.pnpm/apollo-server-errors@3.2.0_graphql@15.6.1/node_modules/apollo-server-errors';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        return new UserInputError('VALIDATION_ERROR', {
          invalidArgs: errors,
        });
      },
    }),
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
