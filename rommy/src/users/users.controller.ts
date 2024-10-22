
import { Body, HttpCode, HttpStatus, HttpException, Controller, Get, Post, UseGuards, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { AddBalanceDto } from './dto/addBalance.dto';
import { AuthGuard } from './auth.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

   
    @Post('/signin')
    async create(@Body() userDto: CreateUserDto){
        try{
            const data = await this.usersService.create(userDto)
            return data
        }
        catch(error){
            
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                warning: error.message,
              }, HttpStatus.FORBIDDEN, {
                cause: error
              });
        }
       
    }

   
    //@UseGuards(JwtAuthGuard)
    @Get('/get-all')
    getAll(){
        return this.usersService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get('/get-user/:id')
    async getUser(@Param('id') id:number){
        try{
            const data = await this.usersService.getUser(id);
            return data
        }
        catch(error){
            
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                warning: error.message,
              }, HttpStatus.FORBIDDEN, {
                cause: error
              });
        }
        
    }

    @Post('/login')
    async Login(@Body() userDto: UserDto){
        console.log(userDto)
        try{
            const data = await this.usersService.login(userDto)
            return data
        }
        catch(error){
            
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                warning: error.message,
              }, HttpStatus.FORBIDDEN, {
                cause: error
              });
        }
       
    }

    @UseGuards(AuthGuard)
    @Patch('/add-balance')
    async AddBalance(@Body() addBalance:AddBalanceDto){
        try{
            const data = await this.usersService.AddBalance(addBalance);
            return data
        }
        catch(error){
            
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                warning: error.message,
              }, HttpStatus.FORBIDDEN, {
                cause: error
              });
        }
        
    }
}
