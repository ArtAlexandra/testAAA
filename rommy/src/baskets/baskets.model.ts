import { Table,Model, Column, DataType, HasMany,BelongsTo, ForeignKey } from "sequelize-typescript";
import { Goods } from "src/goods/goods.model";
import { User } from "src/users/users.model";
@Table
export class Basket extends Model{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id_b:number;

    @ForeignKey(()=>User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId:number;

    @BelongsTo(()=>User)
    user: User;
 

    @ForeignKey(()=>Goods)
    @Column({type: DataType.INTEGER, allowNull: false})
    goodsId:number;

    @BelongsTo(()=>Goods)
    goods: Goods;


    @Column({type: DataType.INTEGER, allowNull: false})
    quantity:number;



    @Column({type: DataType.STRING, allowNull: false})
    description:string;

   
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    payment:boolean;
    
    @Column({type: DataType.INTEGER, defaultValue:0})
    discount: number;
};