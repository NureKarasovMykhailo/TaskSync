import { Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import Activity from "./Activity";


@Table({tableName: 'complexity'})
export default class Complexity extends Model {

    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id!: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    complexityTitle!: string;

    @HasMany(() => Activity)
    activities!: Activity[];
}