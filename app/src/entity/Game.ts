import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User";
import { Board } from "./Board";

@Entity()
export class Game {
   

    @PrimaryGeneratedColumn()
    id: number

    @Column("int")
    players_number: number

    // @ManyToOne(() => User, turn => turn.id)
    // turn: User;

    @Column("int")
    turn: number;


    @Column("varchar", {length: 10})
    state: string

    @Column("timestamp", { default: () => 'CURRENT_TIMESTAMP' })
    last_move: Date

    @Column("int")
    joined_number: number

    @Column("int")
    board_id: number;
}
