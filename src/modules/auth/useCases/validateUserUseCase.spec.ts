import { User } from 'src/modules/user/entities/User';
import { ValidateUserUseCase } from './validateUserUseCase';
import { UserRepositoryInMemory } from 'src/modules/user/repositories/userRepositoryInMemory';
import { hash } from 'bcrypt';
import { makeUser } from 'src/modules/user/factories/userFactory';
import { UnauthorizedException } from '@nestjs/common';

let validateUserUseCase: ValidateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('validate user', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    validateUserUseCase = new ValidateUserUseCase(userRepositoryInMemory);
  });

  it('Should be able to show user with credentials are correct', async () => {
    const userPasswordWithoutEncryption = '1234567';

    const user = makeUser({
      password: await hash(userPasswordWithoutEncryption, 10),
    });

    userRepositoryInMemory.users = [user];

    const result = await validateUserUseCase.execute({
      email: user.email,
      password: userPasswordWithoutEncryption,
    });

    expect(result).toBe(user);
  });

  it('Should be able to show error when if credentials incorrect', async () => {
    const userPasswordWithoutEncryption = '1234567';

    const user = makeUser({
      password: await hash(userPasswordWithoutEncryption, 10),
    });

    userRepositoryInMemory.users = [user];

    expect(async () => {
      await validateUserUseCase.execute({
        email: 'incorrect@email.com',
        password: userPasswordWithoutEncryption,
      });
    }).rejects.toThrow(UnauthorizedException);

    expect(async () => {
      await validateUserUseCase.execute({
        email: user.email,
        password: 'incorrectPasword',
      });
    }).rejects.toThrow(UnauthorizedException);
  });
});
