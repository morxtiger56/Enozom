import jwt from "jsonwebtoken";
import { UserDB } from "../DAO/UserDB";
import config from "../config/config";
import { bcryptPassword } from "../services/user.services";
import { Request, Response, Router } from "express";

const user_store = new UserDB();

const signup = async (req: Request, res: Response) => {
    try {
        const user = await user_store.getUserByName(req.body.username);
        if (user) {
            res.status(403).json({
                message: "User already exists, login instead!",
            });
        } else {
            const password = bcryptPassword(req.body.password);
            const newUserId = await user_store.addUser(
                req.body.username,
                password as string
            );

            if (newUserId && newUserId !== -1) {
                const token = jwt.sign(
                    { userid: newUserId },
                    config.JWT_SECRET
                );
                res.status(200).json({
                    user: {
                        token,
                        userid: newUserId,
                        username: req.body.username,
                    },
                });
            } else {
                res.status(400).json({
                    message: "Error creating user!",
                });
            }
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

export default function signupRoutes(router: Router) {
    router.post("/signup", signup);
}
