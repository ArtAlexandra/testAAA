import { All, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
//import { RolesService } from 'src/roles/roles.service';
import * as bcrypt from 'bcrypt'
import { UserDto } from './dto/user.dto';
import { AddBalanceDto } from './dto/addBalance.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel : typeof User,
        private jwtService: JwtService
      ){}

      findOne(filter: {
        where: { id?: number|string; username?: string; email?: string; phone?: string; };
      }): Promise<User> {
        return this.userModel.findOne({ ...filter });
      }
    
      findAll(): Promise<User[]> {
        return this.userModel.findAll();
      }
      async create(
        createUserDto: CreateUserDto
    ): Promise<User>{
        const user = new User();
        // const existingUserByName = await this.findOne({
        //     where: {name: createUserDto.username}
        // });

        const existingUserByEmail = await this.findOne({
            where: {email : createUserDto.email}
        });
        
        if(existingUserByEmail){
            throw new Error('Пользователь с таким email уже существует')
            
        }

        const existingUserByUsername = await this.findOne({
            where: {username : createUserDto.username}
        });
        
        if(existingUserByUsername){
            throw new Error('Пользователь с таким именем уже существует')
        }
        
        const existingUserByPhone = await this.findOne({
            where: {phone : createUserDto.phone}
        });
        
        if(existingUserByPhone){
            throw new Error('Пользователь с таким номером телефона уже существует')
           
        }
        

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        user.username = createUserDto.username;
        user.email = createUserDto.email;
        user.password = hashedPassword;
        user.phone = createUserDto.phone;
        user.balance = createUserDto.balance;
       

        return user.save();
        

    }

    async getUser(id:number):Promise<CreateUserDto>{
        const user = await this.findOne({where:{id}});
        if(!user){
            throw new Error("Такой пользователь не найден")
        }
        return user;
    }

    async login(
        userDto: UserDto
    ): Promise<{access_token: string, id:number}>{
        const existingUserByEmail = await this.findOne({
            where: {email: userDto.email}
        });
        if(!existingUserByEmail){
            throw new Error("Пользователь с такой почтой не найден")
        };
       
        const passwordValid = await bcrypt.compare(userDto.password, existingUserByEmail.password);
        
        if(!passwordValid){
            throw new Error("Пользователь с таким паролем не найден")
        };
        const payload = { sub: existingUserByEmail.id, username: existingUserByEmail.username };
        const access_token = await this.jwtService.signAsync(payload)
        return {
            access_token: access_token, id: existingUserByEmail?.id
        };
        //return existingUserByEmail;
    }

    async AddBalance(addBalance:AddBalanceDto):Promise<User>{
        const user = await this.findOne({where: {id:addBalance.id}})
       
        console.log(user)
        if(!user){
            throw new Error('Такого пользователя не существует')
        } 
        if(addBalance.balance<=0){
            throw new Error('Баланс можно пополнить только на положительную сумму')
        }
        const balance = user.balance + addBalance.balance
        await this.userModel.update({balance}, {where: {id: addBalance.id}});
        return await this.findOne({where: {id:addBalance.id}});
    }
}
    
    
