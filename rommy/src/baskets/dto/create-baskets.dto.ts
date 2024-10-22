
import { IsNotEmpty } from "class-validator";
import { Goods } from "src/goods/goods.model";
import { User } from "src/users/users.model";

export class CreateBasketDto{

    @IsNotEmpty()
    readonly id_b:number;

    
    @IsNotEmpty()
    readonly userId:number;

  
    @IsNotEmpty()
    readonly user: User;

  
    @IsNotEmpty()
    readonly goods: Goods;
  
 
    @IsNotEmpty()
    readonly goodsId:number;


 
    @IsNotEmpty()  
    readonly quantity:number;


  
    @IsNotEmpty()
    readonly description:string;


    @IsNotEmpty()
    readonly payment:boolean;
    
   
    @IsNotEmpty()
    readonly discount: number;

   
}