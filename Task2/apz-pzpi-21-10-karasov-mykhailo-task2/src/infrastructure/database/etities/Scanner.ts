import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import Company from "./Company";
import ScannerHistory from "./ScannerHistory";


@Table({tableName: 'scanner'})
export default class Scanner extends Model {

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id!: number;

    @ForeignKey(() => Company)
    @Column({type: DataType.INTEGER, allowNull: true})
    companyId!: number;

    @BelongsTo(() => Company)
    company!: Company;

    @HasMany(() => ScannerHistory)
    scannerHistories!: ScannerHistory[]
}