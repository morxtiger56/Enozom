import jwt from 'jsonwebtoken';
import {UserDB } from '../DAO/UserDB';
import config from '../config/config';
import { bcryptPassword } from '../services';
import { Request, Response, Router } from 'express';

const user_calls = new UserDB();

const login = async (req: Request, res: Response) => {
    try {
        const user = await user_calls.getUserByName(req.body.username);
        if (user) {
            const password = bcryptPassword(req.body.password, false, user.password);
            if (password) {
                const token = jwt.sign({ id: user.id }, config.JWT_SECRET);
                res.status(200).json(token);
            } else {
                res.status(401).json("Wrong Password, try again!");
            }
        } else {
            res.status(401);
            res.json({
                message: 'User not found, sign up instead!',
            });
        }
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export default function loginRoutes(router: Router) {
    router.get('/login', login);
}