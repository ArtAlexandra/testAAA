import { Module } from '@nestjs/common';
import { TypeClothesController } from './type-clothes.controller';
import { TypeClothesService } from './type-clothes.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TypeClothes } from './type-clothes.model';

@Module({
  controllers: [TypeClothesController],
  providers: [TypeClothesService],
  imports: [
    SequelizeModule.forFeature([TypeClothes])
    // RolesModule,
    // forwardRef(()=>AuthModule)
  ],
})
export class TypeClothesModule {}
