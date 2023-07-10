import { Entity, PrimaryGeneratedColumn, Column, Table, Unique } from "typeorm";

@Entity()
@Unique(['url'])
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  url: string;

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
