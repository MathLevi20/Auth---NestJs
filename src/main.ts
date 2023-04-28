import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';

async function bootstrap() {
  const authApp = await NestFactory.create(AuthModule);
  const todoApp = await NestFactory.create(TodoModule);
  await authApp.listen(3000);
  await todoApp.listen(4000);
}
bootstrap();
