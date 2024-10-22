import { Controller, Header, HttpCode, HttpStatus, Body, Post, Get, Param, UseInterceptors, Request, UploadedFile, Delete } from '@nestjs/common';
import { SizeService } from './size.service';
import { SizeDto } from './dto/size.dto';


@Controller('size')
export class SizeController {

    constructor(private sizeService: SizeService){}

   
    @Post('/create')
    create(@Body() sizeDto :SizeDto){
        return this.sizeService.create(sizeDto);
    }

   
    @Get('/get-all')
    getAll(){
        return this.sizeService.findAll();
    }

    @Get('/get-size/:id_g')
    getSize(@Param('id_g') id_g:number){
        return this.sizeService.getSize(id_g);
    }


}
