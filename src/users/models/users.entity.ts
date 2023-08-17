import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import {UsersDto} from '../dto/users.dto';

@Entity('users')
export class UsersEntity implements UsersDto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  role: string;
}
