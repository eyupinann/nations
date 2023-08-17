import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../../users/module/users.module';
import { AuthService } from '../service/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../jwt/constants';
import { JwtStrategy } from '../jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "9c2.h.filess.io",
      "port": 3306,
      "username": "New_sangslave",
      "password": "f124192272eb46268f06841395b6cebf637b0868",
      "database": "New_sangslave",
      "logging": true,
      // synchronize: true,
      "entities": ["dist/**/*.entity.js"],
    }),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, TypeOrmModule]
})
export class AuthModule {}
