import { Entity, PrimaryGeneratedColumn, Column, Table } from "typeorm"

@Entity()
export class Board {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    public static getTableSchema(): Table {
        return new Table({
            name: "boards",
            columns: [
                {
                name: "id",
                type: "integer",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
                },
                {
                name: "url",
                type: "varchar",
                },
            ],
            });
    }
}
