import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/repositories/prisma.service';
import { UserRepository } from 'src/modules/user/repositories/userRepository';
import { PrismaUserRepository } from './prisma/repositories/PrismaUserRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository]
})
export class DatabaseModule {}
