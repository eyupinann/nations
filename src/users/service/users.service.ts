import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../models/users.entity';
import { UsersDto } from '../dto/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>
  ) {}

  async findOneByName(name: string): Promise<UsersEntity | undefined> {
    return await this.usersRepository.findOne({ where: { name: name } });
  }

  async findOneById(id: number): Promise<UsersEntity | undefined> {
    return await this.usersRepository.findOne({ where: { id: id } });
  }
  async create(data: UsersDto) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = this.usersRepository.create({
        name: data.name,
        password: hashedPassword,
        role: data.role,
      });
      await this.usersRepository.save(user);
      return user;
  }

  async read(id: number) {
    return await this.usersRepository.findOne({ where: { id: id } });
  }

  async readAll() {
    return await this.usersRepository.find();
  }

  async update(id: number, data: Partial<UsersDto>) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    await this.usersRepository.update({ id }, data);
    return await this.usersRepository.findOne({ where: { id: id } });
  }

  async delete(id: number) {
    const result =  await this.usersRepository.delete({ id });
    return result.affected > 0;
  }
}
