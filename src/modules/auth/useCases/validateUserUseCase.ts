import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserRepository } from 'src/modules/user/repositories/userRepository';

interface ValidateUserRequest {
  email: string;
  password: string;
}

@Injectable()
export class ValidateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: ValidateUserRequest) {
    const user = await this.userRepository.findByEmail(email);

    function notAuthorized() {
      throw new UnauthorizedException('Email ou senha incorretos');
    }

    if (!user) notAuthorized();

    const isPasswordMatched = await compare(password, user.password);

    if (!isPasswordMatched) notAuthorized();

    return user;
  }
}
