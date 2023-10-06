import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from '../../entities/user.entity';
import { UsersRepository } from '../users.repository';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateUserDto): Promise<User> {
    const { cart, ...CreateUserDto } = data;
    const user = new User();
    Object.assign(user, {
      ...CreateUserDto,
      cart: { create: cart },
    });
    const newUser = await this.prisma.user.create({
      data: { ...user, cart: { create: cart } },
    });

    return plainToInstance(User, newUser);
  }
  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({ include: { cart: true } });
    return plainToInstance(User, users);
  }
  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { cart: true },
    });
    return plainToInstance(User, user);
  }
  // async update(id: string, data: UpdateUserDto): Promise<User> {
  //   const user = await this.prisma.user.update({
  //     where: { id },
  //     data: { ...data },
  //   });
  //   return plainToInstance(User, user);
  // }
  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    return plainToInstance(User, user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { cart: true },
    });
    return user;
  }
}
