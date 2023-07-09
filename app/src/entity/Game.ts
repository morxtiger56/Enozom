import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User";
import { Board } from "./Board";

@Entity()
export class Game {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    players_number: number

    @ManyToOne(() => User, turn => turn.id)
    turn: User;

    @Column()
    state: string

    @Column()
    last_move: Date

    @Column()
    joined_number: number

    @ManyToOne(() => Board, board_id => board_id.id)
    board_id: Board;
}
