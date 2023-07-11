import jwt from 'jsonwebtoken';
import { UserDB } from '../DAO/UserDB';
import config from '../config/config';
import { bcryptPassword } from '../services';
import { Request, Response, Router } from 'express';

const user_calls = new UserDB();

const signup = async (req: Request, res: Response) => {
    try {
        const user = await user_calls.getUserByName(req.body.username);

        if (user) {
          res.status(403).json({
            message: "User already exists, login instead!",
          });
        } else {
          const password = bcryptPassword(req.body.password);
          // @ts-ignore
          const newUserId = await user_calls.addUser(
            req.body.username,
            password as string
          );
          if (newUserId !== -1) {
            const token = jwt.sign({ id: newUserId }, config.JWT_SECRET);
            res.status(200).json(token);
          } else {
            res.status(500).json("Error creating user");
          }
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

export default function signupRoutes(router: Router) {
    router.post('/signup', signup);
}