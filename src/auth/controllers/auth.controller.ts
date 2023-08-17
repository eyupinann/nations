import { Controller, Post, Body, HttpStatus } from "@nestjs/common";
import { AuthService } from '../service/auth.service';
import { ApiBody, ApiConsumes } from "@nestjs/swagger";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['name', 'password'],
      properties: {
        name: { type: 'string'},
        password: { type: 'string'},
      },
    },
  })
  async login(@Body() loginDto: any) {
    const user = await this.authService.validateUser(
      loginDto.name,
      loginDto.password,
    );
    if (!user) {
      return { statusCode: HttpStatus.UNAUTHORIZED, message: 'Our user information is incorrect, please try again.'};
    }
    return this.authService.login(user);
  }
}
