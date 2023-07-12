import jwt from 'jsonwebtoken';
import config from '../config/config';
import { UserDB } from '../DAO/UserDB';
import { bcryptPassword } from '../services/user.services';
import { Request, Response, Router } from 'express';

const user_store = new UserDB();

const login = async (req: Request, res: Response) => {
    try {
        const user = await user_store.getUserByName(req.body.username);
        if (user) {
            const doesPasswordsMatch = bcryptPassword(req.body.password, false, user.password);
            if (doesPasswordsMatch) {
                const token = jwt.sign({ userid: user.id }, config.JWT_SECRET);
                res.status(200).json({ 
                    user : {
                        token : token,
                        userid: user.id,
                        username: req.body.username
                    }
                });
            } else {
                res.status(401).json({
                    message: "Wrong Password, try again!",
                });
            }
        } else {
            res.status(401);
            res.json({
                message: 'User not found, sign up instead!',
            });
        }
    } catch (err) {
        res.status(400).json(err);
    }
};

export default function loginRoutes(router: Router) {
    router.post('/login', login);
}