import { Module } from '@nestjs/common';
import { BasketsController } from './baskets.controller';
import { BasketsService } from './baskets.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Basket } from './baskets.model';
import { User } from 'src/users/users.model';
import { Goods } from 'src/goods/goods.model';

@Module({
  imports: [SequelizeModule.forFeature([Basket]), SequelizeModule.forFeature([User]), SequelizeModule.forFeature([Goods])],
  controllers: [BasketsController],
  providers: [BasketsService],
  exports: [BasketsService]
})
export class BasketsModule {}
