export class GoodsDto{
    readonly id_g:number;

    readonly title:string;

    readonly price:number;

    readonly article:string;

    readonly quantity:number;

    readonly description:string;

    readonly mark:number;

    readonly composition:string;

    readonly state:string;

    readonly firstImage:string;

    readonly typeId:number;

    readonly shopId:number;
   
}

export class GoodsBigDto{
    readonly id_g:number;

    readonly title:string;

    readonly price:number;

    readonly article:string;

    readonly quantity:number;

    readonly description:string;

    readonly mark:number;

    readonly composition:string;

    readonly state:string;

    readonly firstImage:string;

    readonly typeName:string;

    readonly shopName:string;

   // readonly image:string[];

    readonly size:string[];

   
}