import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { User } from '../../entities/User';
import { UserRepository } from '../../repositories/userRepository';

interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute({ email, name, password }: CreateUserRequest) {
    const user = new User({
      name,
      email,
      password: await hash(password, 10),
    });

    await this.userRepository.create(user);

    return user;
  }
}
