import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from 'src/modules/user/useCases/createUserUseCase/createUserUseCase';
import { CreateUserBody } from './dtos/CreateUserBody';

@Controller('users')
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post('')
  async createUser(@Body() body: CreateUserBody) {
    const { email, name, password } = body;
    return this.createUserUseCase.execute({ email, name, password });
  }
}
