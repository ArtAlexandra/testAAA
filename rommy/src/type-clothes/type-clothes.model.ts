import {  Model, Column, DataType, Table, BelongsToMany } from "sequelize-typescript";
@Table
export class TypeClothes extends Model{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name:string;

}