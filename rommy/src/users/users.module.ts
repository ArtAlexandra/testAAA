
import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.model';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from "./constants"

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    // RolesModule,
    // forwardRef(()=>AuthModule)
  ],
  //exports:[UsersService,]
})
export class UsersModule {}
