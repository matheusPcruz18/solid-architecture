import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  async signIn(@Request() request: any) {
    return request.user;
  }
}
