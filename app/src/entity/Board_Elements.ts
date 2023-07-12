import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm";
import { Board } from "./Board";

@Entity()
export class Board_Elements {
    @PrimaryColumn("int")
    @ManyToOne(() => Board, (board_id) => board_id.id)
    board_id: number;

    @Column("varchar", { length: 1 })
    element: string;

    @PrimaryColumn("int")
    start: number;

    @Column("int")
    end: number;
}
