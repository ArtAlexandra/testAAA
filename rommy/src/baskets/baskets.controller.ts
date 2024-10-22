import { FileInterceptor } from '@nestjs/platform-express';
import { UseGuards, HttpException, Controller, Header, HttpCode, HttpStatus, Body, Post, Get, Param, UseInterceptors, UploadedFiles, UploadedFile, Delete } from '@nestjs/common';
import { BasketsService } from './baskets.service';
import { CreateBasketDto } from './dto/create-baskets.dto';
import { AuthGuard } from '../users/auth.guard';

@Controller('baskets')
export class BasketsController {

    constructor(private readonly basketService: BasketsService){}

    @UseGuards(AuthGuard)
    @Post('/create-basket')
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-type', 'application/json')
    async createBasket(@Body() createBasketDto :CreateBasketDto){
        try{
            const data = await this.basketService.create(createBasketDto);
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
    @Delete('/delete/:id')
    async removeOne(@Param('id') id:number){
        try{
            const data = await this.basketService.remove(id);
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
    @Get(`/getall-basket`)
    async getAllBaskets() {
        try{
            const data = await this.basketService.findAll()
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
    @Get('/basket-user/:id')
    async getBasketUser(@Param('id') id:number){
        try{
            const data = await this.basketService.getBasketUser(id);
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
    @Post('/buybasket/:id')
    async buyBasket(@Param('id') id:number){
        try{
            const data = await this.basketService.buyGoods(id);
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