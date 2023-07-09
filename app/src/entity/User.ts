import { Entity, PrimaryGeneratedColumn, Column, Table } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 256 })
    name: string

    @Column()
    password: string

    @Column()
    token_id: string

    @Column()
    expiary_date: Date

    @Column("bool")
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