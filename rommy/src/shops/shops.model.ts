
import {  Model, Column, DataType, Table, BelongsToMany } from "sequelize-typescript";
@Table
export class Shop extends Model{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name:string;

    @Column({type: DataType.STRING, allowNull: false})
    password:string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    address:string;

    @Column({type: DataType.STRING,  allowNull: false})
    owner:string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    phone:string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email:string;

    @Column({type: DataType.STRING, allowNull:true})
    image:string;

    @Column({type: DataType.STRING, allowNull:true})
    city:string;

    @Column({type: DataType.STRING, allowNull:true})
    timeWork:string;

}