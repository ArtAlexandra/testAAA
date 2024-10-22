import { Module } from '@nestjs/common';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Goods } from './goods.model';
//import { ImagesGoods } from 'src/images-goods/images-goods.model';
import { TypeClothes } from 'src/type-clothes/type-clothes.model';
import { Size } from 'src/size/size.model';
import { Shop } from 'src/shops/shops.model';

@Module({
  controllers: [GoodsController],
  providers: [GoodsService],
  imports: [
    SequelizeModule.forFeature([Goods]),
   // SequelizeModule.forFeature([ImagesGoods]),
    SequelizeModule.forFeature([TypeClothes]),
    SequelizeModule.forFeature([Size]),
    SequelizeModule.forFeature([Shop])




    // RolesModule,
    // forwardRef(()=>AuthModule)
  ],
  
  exports:[GoodsService]
})
export class GoodsModule {}
