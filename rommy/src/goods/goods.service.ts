import { All, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Goods } from './goods.model';
import { GoodsBigDto, GoodsDto } from './dto/goods.dto';

import { Size } from 'src/size/size.model';
import { TypeClothes } from 'src/type-clothes/type-clothes.model';
import { Shop } from 'src/shops/shops.model';


@Injectable()
export class GoodsService {
    constructor(
        @InjectModel(Goods)
        private goodsModel : typeof Goods,

     

        @InjectModel(Size)
        private sizeModel : typeof Size,

        @InjectModel(TypeClothes)
        private typeclothesModel : typeof TypeClothes,

        @InjectModel(Shop)
        private shopsModel : typeof Shop,
      ){}

      findOne(filter: {
        where: { id_g?: number|string; title?: string; article?:string };
      }): Promise<Goods> {
        return this.goodsModel.findOne({ ...filter });
      }
    
      findAllParams(filter: {
        where: { id_g?: number|string; title?: string; article?:string; shopId?:number; typeId?:number; };
      }): Promise<Goods[]> {
        return  this.goodsModel.findAll({ ...filter });
      }

      findAll(): Promise<Goods[]> {
        return  this.goodsModel.findAll();
      }
      async create(
        goodsDto: GoodsDto, image:string
    ): Promise<Goods>{
       
        const goods = new Goods();
      
        const existingGoodsByArticle = await this.findOne({
            where: { article: goodsDto.article}
        });
        
        if(existingGoodsByArticle){
            throw new Error('Одежда с таким артикулом уже существует')
        }

        const existingGoodsByTitle = await this.findOne({
            where: { title: goodsDto.title}
        });
        
        if(existingGoodsByTitle){
            throw new Error('Одежда с таким названием уже существует')
        }
        
     
       goods.composition = goodsDto.composition;
       goods.quantity = goodsDto.quantity;
       goods.description = goodsDto.description;
       goods.mark = goodsDto.mark;
       goods.state = goodsDto.state;
       goods.title = goodsDto.title;
       goods.price = goodsDto.price;
       goods.shopId = goodsDto.shopId;
       goods.typeId = goodsDto.typeId;
       goods.article = goodsDto.article;
       goods.firstImage = image;
        return goods.save(); 

    }

    async getGoodsId(id_g:number):Promise<GoodsDto>{
        const goods = await this.findOne({where:{id_g}});
        if(!goods){
            throw new Error("Такой товар не найден")
        }
        return goods;
    }

    async getGoodsShopsId(id:number):Promise<Goods[]>{
        const goods = await this.findAllParams({where:{shopId:id}});

        if(!goods.length){
            throw new Error("У данного магазина пока нет товаров")
        }
        return goods;
    }

    async getGoodsTypeClothes(id:number):Promise<GoodsDto[]>{
        let goods = await this.findAll();
        goods = goods.filter(item=>item.typeId===id)
        if(!goods){
            throw new Error("Нет ни одной одежды такого типа")
        }
        return goods;
    }
    
    async getGoods():Promise<any[]>{
        let imagesGoods = await this.goodsModel.findAll();
        
        let a = imagesGoods.map(item=>{
            return{
                id_g:item.id_g,
                title:item.title,
                //images: item.images
            }
        }
        )
         console.log(a)
        
        if(!imagesGoods.length){
            throw new Error("Такой магазин не найден")
        }
       
        return a;
    }

    async getGoodsSortType(id:number):Promise<Goods[]>{
        const goods = await this.findAllParams({where:{typeId:id}});
        
        if(!goods){
            throw new Error("Такого типа одежды нет")
        }
       
        return goods;
    }
    async getGoodsSortPrice(id:number):Promise<Goods[]>{
        let goods = await this.findAll();
        if(id==1){
            goods = goods.sort((a, b)=>a.price - b.price)
        }
        if(id==-1){
            goods = goods.sort((a, b)=>b.price - a.price)
        }
       
        
        if(!goods){
            throw new Error("Возникла какая-то ошибка")
        }
       
        return goods;
    }



    async getGoodsImages(id_g:number):Promise<GoodsBigDto>{
        let goods = await this.findOne({where:{id_g:id_g}})

        if(!goods){
            throw new Error("Такой товар не найден")
        }

        //let imagesArray = await this.imagesGoodsModel.findAll({where: {id_g: goods.id_g}})

        let types = await this.typeclothesModel.findOne({where:{id: goods.typeId}});

        let sizeArray = await this.sizeModel.findAll({where: {id_g: goods.id_g}})

        let shop = await this.shopsModel.findOne({where:{id: goods.shopId}});

        //let images = imagesArray.map(item=>item.image)
        let size = sizeArray.map(item=>item.title)

        let answer:GoodsBigDto = {
            id_g: goods.id_g,
            title: goods.title,
             price:goods.price,
             firstImage: goods.firstImage,

             article:goods.article,
        
             quantity:goods.quantity,
        
             description:goods.description,
        
             mark:goods.mark,
        
             composition:goods.composition,
        
             state:goods.state,
        
             typeName:types.name,
        
             shopName:shop.name,
        
          //   image:images,
             size: size
        }

        return answer;
    }

    async getGoodsShop(name:string):Promise<GoodsDto[]>{
        let goods = await this.findAll();
        goods = goods.filter(item=>item.shop.name==name)
        if(!goods){
            throw new Error("У этого магазина пока нет товара")
        }
        return goods;
    }

    async getGoodsQuantity(id_g:number):Promise<number>{
        let goods = await this.findOne({where:{id_g}});
       
        if(!goods){
            throw new Error("Такой товар не найден")
        }
        return goods.quantity;
    }

 
    async deleteGoods(id:number):Promise<void>{
        const goods = await this.findOne({where:{id_g:id}})
        if(!goods){
            throw new Error("Такого товара не существует")
        }
        await goods.destroy();
    }
}
