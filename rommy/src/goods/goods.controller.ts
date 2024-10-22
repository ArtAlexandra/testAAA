
import { GoodsDto } from './dto/goods.dto';
import { GoodsService } from './goods.service';
import { UseGuards, HttpException, Controller, Header, HttpCode, HttpStatus, Body, Post, Get, Param, UseInterceptors, Request, UploadedFile, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../users/auth.guard';
import { diskStorage } from 'multer';
import path = require('path');

export const storage = {
    // './uploads/profileimages'
    storage: diskStorage({
        destination: '../front/public/image/goods',
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '');// + uuidv4();
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extension}`)
        }
    })

}

@Controller('goods')
export class GoodsController {

    constructor(private goodsService: GoodsService){}

    @UseGuards(AuthGuard)
    @Post('/create')
    @UseInterceptors(FileInterceptor('file', storage))
    async create(@Body() goodsDto :GoodsDto,@UploadedFile() file){
        try{
            const data = await this.goodsService.create(goodsDto, file.originalname);
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
    @Get('/get-all')
    async getAll(){
        try{
            const data = await this.goodsService.findAll();
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
    @Get('/get-goods/:id_g')
    async getShop(@Param('id_g') id_g:number){
        try{
            const data = await this.goodsService.getGoodsId(id_g);
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
    @Get('/get-goodsname/:name')
    async getShops(@Param('name') name:string){
        try{
            const data = await this.goodsService.getGoodsShop(name);
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
    @Get('/get-goodsimages/:id_g')
    async getShopsAll(@Param('id_g') id_g:number){
        try{
            const data = await this.goodsService.getGoodsImages(id_g);
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
    @Get('/sorttype/:id')
    async getGoodsSortType(@Param('id') id:number){
        try{
            const data = await this.goodsService.getGoodsSortType(id);
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
    @Get('/sortprice/:id')
    async getGoodsSortPrice(@Param('id') id:number){
        try{
            const data = await this.goodsService.getGoodsSortPrice(id);
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
    @Get('/get-goodsall')
    async getGoodsAll(){
        try{
            const data = await this.goodsService.getGoods();
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
    @Get('/get-goodshopsid/:id')
    async getGoodsShopId(@Param('id') id:number){
        try{
            const data = await this.goodsService.getGoodsShopsId(id);
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
    @Delete('/goods-delete/:id')
    async geleteGoods(@Param('id') id:number){
        try{
            const data = await this.goodsService.deleteGoods(id);
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
