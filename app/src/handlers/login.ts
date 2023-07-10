// import dotenv from 'dotenv';
// import jwt from 'jsonwebtoken';
// import { authenticateToken } from '../services';
// import { Request, Response, Application } from 'express';

// dotenv.config();

// const show = async (req: Request, res: Response) => {
//     try {
//         const user = await store.show(req.params.id);
//         res.json(user);
//     } catch (err) {
//         res.status(400);
//         res.json(err);
//     }
// };

// const authenticatePassword = async (req: Request, res: Response) => {
//     try {
//         const user = await store.authenticatePassword(
//             req.params.id,
//             req.body.password
//         );

//         if (user) {
//             const token = jwt.sign(user, process.env.JWT_SECRET!);
//             res.status(200).json(token);
//         } else {
//             res.status(401);
//             res.json({
//                 message: 'User not found, sign up instead!',
//             });
//         }
//     } catch (err) {
//         res.status(400);
//         res.json(err);
//     }
// };

// export default function userRoutes(app: Application) {
//     app.get('/', authenticatePassword);
// }
