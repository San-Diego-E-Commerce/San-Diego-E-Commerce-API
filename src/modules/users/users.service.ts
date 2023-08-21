import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const findUsername = await this.usersRepository.findByUsername(
      createUserDto.username,
    );

    if (findUsername) {
      throw new ConflictException('Nome de usuário já existe.');
    }

    const findEmail = await this.usersRepository.findByEmail(
      createUserDto.email,
    );

    if (findEmail) {
      throw new ConflictException('Email já cadastrado.');
    }

    const user = await this.usersRepository.create(createUserDto);

    return user;
  }

  async findAll() {
    return this.usersRepository.findAll();
  }

  async findOne(id: string) {
    const findUser = await this.usersRepository.findOne(id);
    if (!findUser) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    return this.usersRepository.findOne(id);
  }

  async findByEmail(email: string) {
    const findUser = await this.usersRepository.findByEmail(email);

    return findUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const findUser = await this.usersRepository.findOne(id);
    if (!findUser) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    const findUser = await this.usersRepository.findOne(id);
    if (!findUser) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    return this.usersRepository.delete(id);
  }
}
