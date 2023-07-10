import { Entity, PrimaryGeneratedColumn, Column, Table, Unique } from "typeorm"

@Entity()
@Unique(['name'])
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 256 })
    name: string

    @Column()
    password: string

    @Column({ default: null})
    token_id: string

    @Column({ default: null})
    expiary_date: Date

    @Column("bool", { default: null})
    isLogin: boolean

    public static getTableSchema(): Table {
        return new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "256",
                },
                {
                    name: "password",
                    type: "varchar",
                },
                {
                    name: "token_id",
                    type: "varchar",
                },
                {
                    name: "expiary_date",
                    type: "timestamp",
                },
                {
                    name: "isLogin",
                    type: "boolean",
                },
            ],
        });
    }
}