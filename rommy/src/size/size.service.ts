import { All, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Size } from './size.model';
import { SizeDto } from './dto/size.dto';
import { Goods } from 'src/goods/goods.model';


@Injectable()
export class SizeService {
    constructor(
        @InjectModel(Size)
        private sizeModel : typeof Size,
        @InjectModel(Goods)
        private goodsModel: typeof Goods
      ){}

      findOne(filter: {
        where: { id?: number|string; title?: string; id_g?:number };
      }): Promise<Size> {
        return this.sizeModel.findOne({ ...filter });
      }
    
      findAll(): Promise<Size[]> {
        return  this.sizeModel.findAll();
      }
      async create(
        sizeDto: SizeDto
    ): Promise<Size| {warningMessage:string}>{
        const size= new Size();
      
        const goods = await this.goodsModel.findOne({where: {id_g: sizeDto.id_g}})
        if(goods!==null){
            size.title = sizeDto.title;
            size.id_g = sizeDto.id_g;
        
            return size.save();
        }
       
        return{
            warningMessage:"Такой товар не найден"
        }
        
       
       
    }

    // async getSize(name:string):Promise<SizeDto|string>{
    //     const typeClothes = await this.findOne({where:{name}});
    //     if(!typeClothes){
    //         return "Такой магазин не найден";
    //     }
    //     return typeClothes;
    // }
    async getSize(id_g:number):Promise<Size|string>{
        let sizeGoods = await this.findOne({where:{id_g:id_g}})
        if(!sizeGoods){
            return "Такой магазин не найден";
        }
       
        return sizeGoods;
    }
    
 
}
