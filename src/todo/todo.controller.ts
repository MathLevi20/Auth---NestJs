import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get('gethello')
  async getHello() {
    return 'Hello World! App';
  }
  @Post()
  async create(@Body() todo: Todo): Promise<Todo> {
    return this.todoService.create(todo);
  }

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() todo: Todo): Promise<Todo> {
    return this.todoService.update(id, todo);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Todo> {
    return this.todoService.remove(id);
  }
}
export { TodoService };
