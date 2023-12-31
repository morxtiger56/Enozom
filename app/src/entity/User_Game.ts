import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { Game } from "./Game";

@Entity({ name: 'User_Game' })
export class User_Game {
    @PrimaryColumn("int")
    @ManyToOne(() => Game, (game_id) => game_id.id)
    game_id: number;

    @PrimaryColumn("int")
    @ManyToOne(() => User, (user_id) => user_id.id)
    user_id: number;

    @Column("boolean")
    active: boolean;

    @Column("int")
    position: number;

    @Column("int")
    turn_order: number;
}
