
import {  BelongsTo, ForeignKey,Model, Column, DataType, Table, BelongsToMany } from "sequelize-typescript";
import { Goods } from "src/goods/goods.model";
@Table
export class Size extends Model{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    title:string;

    @ForeignKey(()=>Goods)
    @Column({type: DataType.INTEGER, allowNull: false})
    id_g:number;

    @BelongsTo(()=>Goods)
    goods: Goods;

    
}