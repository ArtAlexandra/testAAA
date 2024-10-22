import { ApiProperty } from "@nestjs/swagger";

export class CreateShopDto{
    
    readonly id: number;

    readonly name:string;

    readonly password:string;

    readonly address:string;

    readonly owner:string;

    readonly phone:string;

    readonly email:string;

    readonly image:string;

    readonly city:string;
    readonly timeWork:string;


   
}