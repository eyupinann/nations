import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';

import { UsersService } from '../service/users.service';
import { UsersDto } from '../dto/users.dto';
import { ApiBody, ApiConsumes,  ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from '../../auth/guard/jwt-auth-guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guard/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('application/x-www-form-urlencoded')
  async createUser(@Body() data: UsersDto) {
    const user = await this.usersService.create(data);
    return {
      statusCode: HttpStatus.OK,
      message: 'User created successfully',
      user
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('application/x-www-form-urlencoded')
  async readUser(@Param('id') id: number) {
    const data =  await this.usersService.read(id);
    const { name, role } = data;
    return {
      statusCode: HttpStatus.OK,
      message: 'User fetched successfully',
      data: { id, name, role }
    };
  }

  @Get()
  async readAllUsers() {
    const users =  await this.usersService.readAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Users fetched successfully',
      users
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['name', 'password', 'role'],
      properties: {
        name: { type: 'string'},
        password: { type: 'string'},
        role: { type: 'string' },
      },

    },
  })

  async uppdateUser(@Param('id') id: number, @Body() data: Partial<UsersDto>) {
   const isUpdated = await this.usersService.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: isUpdated ? 'User updated successfully' : 'User not found',
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiConsumes('application/x-www-form-urlencoded')
  async deleteUser(@Param('id') id: number) {
    const isDeleted = await this.usersService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: isDeleted ? 'User deleted successfully' : 'User not found',
    };
  }
}
