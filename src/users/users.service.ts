import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository :Repository<User>
  ){}
 async create(createUserDto: CreateUserDto) {
        try{
          const newUser= this.userRepository.create(createUserDto);
          return await this.userRepository.save(newUser);
        }catch(error){
          console.log(error)
            throw new BadRequestException("خطایی رخ داده است")
        }


  }

  async findAll() {
    try{
       return await this.userRepository.find()
    }catch(error){
            throw new BadRequestException("خطایی رخ داده است")
    }
  }

 async findOne(id: number) {
    try{
      return await this.userRepository.findOneBy({id});
    }catch(error){
      throw new BadRequestException('خطایی رخ داده است');
    }
   }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
