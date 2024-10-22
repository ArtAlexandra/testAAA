import { Module } from '@nestjs/common';
import { SizeController } from './size.controller';
import { SizeService } from './size.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Size } from './size.model';
import { Goods } from 'src/goods/goods.model';

@Module({
  controllers: [SizeController],
  providers: [SizeService],
  imports: [
    SequelizeModule.forFeature([Size]),
    SequelizeModule.forFeature([Goods])

    // RolesModule,
    // forwardRef(()=>AuthModule)
  ],
})
export class SizeModule {}
