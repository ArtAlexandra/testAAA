import { Table,Model, Column, DataType, HasMany,BelongsTo, ForeignKey } from "sequelize-typescript";
//import { ImagesGoods } from "src/images-goods/images-goods.model";
import { Shop } from "src/shops/shops.model";
import { TypeClothes } from "src/type-clothes/type-clothes.model";



@Table
export class Goods extends Model{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id_g:number;

 
    @Column({type: DataType.STRING, allowNull: false})
    title:string;

    @Column({type: DataType.INTEGER, allowNull: false})
    price:number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    article:string;

    @Column({type: DataType.INTEGER, allowNull: false})
    quantity:number;

    @Column({type: DataType.STRING})
    description:string;

    @Column({type: DataType.INTEGER, allowNull: false})
    mark:number;


    @Column({type: DataType.STRING, allowNull: false})
    composition:string;

    @Column({type: DataType.STRING, allowNull: false})
    state:string;
  
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    firstImage:string;

    @ForeignKey(()=>TypeClothes)
    @Column({type: DataType.INTEGER, allowNull: false})
    typeId:number;


    @BelongsTo(()=>TypeClothes)
    type: TypeClothes;


    @ForeignKey(()=>Shop)
    @Column({type: DataType.INTEGER, allowNull: false})
    shopId:number;


    @BelongsTo(()=>Shop)
    shop: Shop;

    // @HasMany(()=>ImagesGoods)
    // images:ImagesGoods[];
   
};