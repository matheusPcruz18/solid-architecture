import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy';
import { ValidateUserUseCase } from 'src/modules/auth/useCases/validateUserUseCase';
import { UserRepository } from 'src/modules/user/repositories/userRepository';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [UserModule, DatabaseModule],
  controllers: [AuthController],
  providers: [LocalStrategy, ValidateUserUseCase],
})
export class AuthModule {}
