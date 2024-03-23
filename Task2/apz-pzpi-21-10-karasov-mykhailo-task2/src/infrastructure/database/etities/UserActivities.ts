import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import User from "./User";
import Activity from "./Activity";

@Table({tableName: 'user_activities', createdAt: false, updatedAt: false})
export default class UserActivities extends Model {

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id!: number;

    @Column({type: DataType.DATE, allowNull: false})
    timeStart!: Date;

    @Column({type: DataType.DATE, allowNull: false})
    timeEnd!: Date;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId!: number;

    @ForeignKey(() => Activity)
    @Column({type: DataType.INTEGER, allowNull: false})
    activityId!: number;
}