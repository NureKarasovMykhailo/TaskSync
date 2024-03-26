import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import User from "./User";
import Company from "./Company";

@Table({tableName: 'user_companies', createdAt: false, updatedAt: false})
export default class UserCompanies extends Model {

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id!: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: true})
    userId!: number

    @ForeignKey(() => Company)
    @Column({type: DataType.INTEGER, allowNull: true})
    companyId!: number
}