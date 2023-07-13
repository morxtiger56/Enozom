import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm";
import { Board } from "./Board";

@Entity({name: "Board_Elements"})
export class Board_Elements {
    @PrimaryColumn("int")
    board_id: number;

    @Column("varchar", { length: 1 })
    element: string;

    @PrimaryColumn("int")
    start: number;

    @Column("int")
    end: number;
}
