import { Request, Response, NextFunction } from "express";
import config from "../config/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const { PEPPER, SALT_ROUNDS, JWT_SECRET } = config;

export const authenticateUserMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (token == null) return res.sendStatus(401);
        jwt.verify(token.trim(), JWT_SECRET!, (err, user) => {
            if (err)
                return res.status(403).json({
                    message:
                        "Login, signup, or stop playing with tokens, please!",
                });
            req.body.userid = JSON.parse(JSON.stringify(user)).userid;
            console.log(req.body.userid);
            next();
        });
    } catch (err) {
        res.status(401);
        res.json(err);
    }
};

export const authenticateUser = (
    body: any
) => {
    jwt.verify(String(body.token).trim(), JWT_SECRET!, (err, user) => {
        if (err) body.userid = 0;
        else body.userid = JSON.parse(JSON.stringify(user)).userid;
    });
};

export const bcryptPassword = (
    txtPassword: string,
    to_hash = true,
    hashPassword = ""
): string | boolean => {
    if (to_hash) {
        return bcrypt.hashSync(txtPassword + PEPPER, SALT_ROUNDS);
    } else {
        return bcrypt.compareSync(txtPassword + PEPPER, hashPassword);
    }
};
