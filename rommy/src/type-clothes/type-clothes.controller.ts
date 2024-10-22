
import { TypeClothesDto } from './dto/type-clothes.dto';
import { TypeClothesService } from './type-clothes.service';
import { Controller, Header, HttpCode, HttpStatus, Body, Post, Get, Param, UseInterceptors, Request, UploadedFile, Delete } from '@nestjs/common';

@Controller('type-clothes')
export class TypeClothesController {
    constructor(private typeClothesService: TypeClothesService){}

   
    @Post('/create')
    create(@Body() typeClothesDto :TypeClothesDto){
        return this.typeClothesService.create(typeClothesDto);
    }

   
    @Get('/get-all')
    getAll(){
        return this.typeClothesService.findAll();
    }

    @Get('/get-typeclothes/:name')
    getTypeClothes(@Param('name') name:string){
        return this.typeClothesService.getTypeClothes(name);
    }


}
