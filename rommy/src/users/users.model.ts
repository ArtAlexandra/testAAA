
import {  Model, Column, DataType, Table, BelongsToMany } from "sequelize-typescript";
@Table
export class User extends Model{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    username:string;

    @Column({type: DataType.STRING, allowNull: false})
    password:string;

    @Column({type: DataType.INTEGER})
    balance:number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    phone:string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email:string;

}