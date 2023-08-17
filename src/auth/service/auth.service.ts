import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/service/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(name: string, password: string): Promise<any> {
    const user = await this.userService.findOneByName(name);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { name: user.name, sub: user.id };

      return {
        access_token: this.jwtService.sign(payload),
        userData:{
          id: user.id,
          name: user.name,
          role: user.role,
        }
      };

  }
}

