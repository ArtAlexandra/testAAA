import { Module } from '@nestjs/common';
import { ShopsController } from './shops.controller';
import { ShopsService } from './shops.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Shop } from './shops.model';

@Module({
  controllers: [ShopsController],
  providers: [ShopsService],
  imports: [
    SequelizeModule.forFeature([Shop])
    // RolesModule,
    // forwardRef(()=>AuthModule)
  ],
})
export class ShopsModule {}
