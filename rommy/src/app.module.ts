import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { User } from './users/users.model';
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { ShopsModule } from './shops/shops.module';
import { TypeClothesModule } from './type-clothes/type-clothes.module';
import { GoodsModule } from './goods/goods.module';
import { SizeModule } from './size/size.module';
//import { ImagesGoodsModule } from './images-goods/images-goods.module';
import { BasketsModule } from './baskets/baskets.module';
//import { PurchasedModule } from './purchased/purchased.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
 
  providers: [],
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: `.${process.env.NODE_ENV}.env`
    // }),
      SequelizeModule.forRoot({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        models: [User],
       autoLoadModels: true,
      
     // synchronize:true,
      
      
      }),
    UsersModule,
    ShopsModule,
    TypeClothesModule,
    GoodsModule,
    SizeModule,
    //ImagesGoodsModule,
    BasketsModule,
    //PurchasedModule,
  ],
})
export class AppModule {}
