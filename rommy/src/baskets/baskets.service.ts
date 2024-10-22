import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Basket } from './baskets.model';

import { User } from 'src/users/users.model';
import { Goods } from 'src/goods/goods.model';
import { UsersService } from '../users/users.service';
import { CreateBasketDto } from './dto/create-baskets.dto';

@Injectable()
export class BasketsService {

    constructor(
        @InjectModel(Basket)
        private basketModel : typeof Basket,

        @InjectModel(User)
        private userModel : typeof User,

        @InjectModel(Goods)
        private goodsModel : typeof Goods,
      ){}
  

      async getBasketUser(id:number):Promise<Basket[]>{
        const basket = await this.basketModel.findAll({include: [User, Goods], where:{userId:id}});
       return basket
    }


    findOne(filter: {
        where: { id_b?: number|string;  goodsId?: number|string };
      }): Promise<Basket> {
        return this.basketModel.findOne({...filter},);
      }
      
      findAll(): Promise<Basket[]> {
        return this.basketModel.findAll({include: [User, Goods]});
      }
      
      async buyGoods(id:number):Promise<string>{
       
            
            const goods = await this.basketModel.findOne({ 
                where:{id_b:id},
               include: [{model: User}, {model: Goods}]
               
            });
        
            if(!goods){
                throw new Error("Такой товар не найден")
                
            }
            if(goods.payment){
                throw new Error('Этот товар уже оплачен')
            }
    
            if(!goods.quantity){
                throw new Error("Добавьте необходимое количество товара!")
            }

            if(goods.user.balance<goods.quantity * goods.goods.price){
                throw new Error("Средств на счету не хватает для покупки товара. Пожалуйста, пополните баланс.")
              
            }
        
            if(goods.quantity> goods.goods.quantity){
                throw new Error("К сожалению, сейчас на складе нет такого количества товара.")
            }

           

            const balance = goods.user.balance - goods.quantity * goods.goods.price;
            let quantity = 0;
            const payment = true;
            await this.basketModel.update({ quantity, payment}, {where: {id_b:id}});
            quantity = goods.goods.quantity - goods.quantity;
            await this.goodsModel.update({quantity}, {where: {id_g: goods.goods.id_g}});
            await this.userModel.update({balance},{where: {id: goods.user.id}});
            return `Товар успешно куплен`;
      }
     
    




    async remove(id:number):Promise<void>{
        const goodsDelete = await this.basketModel.findOne({
            where: {id_b: id}
        });
       await goodsDelete.destroy();
    }

    async create(
        createBasketDto: CreateBasketDto
    ): Promise<Basket>{
        
        
        const existingGoodsByGoodsId = await this.findOne({
            where: { goodsId: createBasketDto.goodsId}
        });
        if(!existingGoodsByGoodsId){
            throw new Error('Такого товара не существует')
        }

        const existinguserById = await this.userModel.findOne({
            where: { id: createBasketDto.userId}
        });
        if(!existinguserById){
            throw new Error('Такого пользователя не существует')
        }

       
        if(createBasketDto.quantity<=0){
            throw new Error('Можно добавить в карзину только положительное число вещей')
        }

        const goods = await this.goodsModel.findOne({where:{id_g: createBasketDto.goodsId}})
        const quantity = goods.quantity - createBasketDto.quantity 
        await this.goodsModel.update({quantity},{where: {id_g: createBasketDto.goodsId}});

        const basket = new Basket();
       
        basket.goodsId = createBasketDto.goodsId;
        basket.userId = createBasketDto.userId;
        basket.payment = createBasketDto.payment;
        basket.description = createBasketDto.description;
        basket.discount = createBasketDto.discount;
        basket.quantity = createBasketDto.quantity;


        return basket.save();



    }

    
    

  

}