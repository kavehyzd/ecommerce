import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = this.userRepository.create(createUserDto);
      return await this.userRepository.save(newUser);
    } catch (error) {
      console.log(error);
      throw new BadRequestException("خطایی رخ داده است");
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new BadRequestException("خطایی رخ داده است");
    }
  }

  async findOne(id: number) {
    try {
      return await this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new BadRequestException("خطایی رخ داده است");
    }
  }
  async findOneByMobile(mobile: string) {
    try {
      return await this.userRepository.findOneBy({ mobile });
    } catch (error) {
      throw new BadRequestException("خطایی رخ داده است");
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException(`کاربر با شناسه ${id} یافت نشد`);

    try {
      const updateUser = await this.userRepository.update(id, {
        name: updateUserDto.name,
      });
      return await this.findOne(id);
    } catch (error) {
      throw new BadRequestException("خطایی رخ داده است");
    }
  }

  async remove(id: number): Promise<void> {
    const result = this.userRepository.delete(id);
    if ((await result).affected === 0)
      throw new NotFoundException(`کاربر با شناسه ${id} پیدا نشد `);
  }
}
