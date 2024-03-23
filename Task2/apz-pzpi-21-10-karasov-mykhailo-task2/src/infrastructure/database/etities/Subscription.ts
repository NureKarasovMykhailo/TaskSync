import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import User from "./User";


@Table({tableName: 'subscription'})
export default class Subscription extends Model {

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id!: number;

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    code!: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: true})
    userId!: number;

    @BelongsTo(() => User)
    user!: User;
}