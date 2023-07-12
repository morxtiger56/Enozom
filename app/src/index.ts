import express, { Request, Response, Application } from 'express';
import userRouter from './router/user';
import gameRouter from './router/game';
import config from './config/config';
import bodyParser from 'body-parser';
import cors from 'cors';

// import productRoutes from './handlers/products';
// import orderRoutes from './handlers/orders';
// import userRoutes from './handlers/users';

const { PORT, HOST } = config;
const app: Application = express();
const address = `http://${HOST}:${PORT}`;

const corsOptions = {
  origin: '*',
  methods: 'GET,PUT,POST,DELETE',
  optionsSuccessStatus: 204
};

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use('/user', userRouter);
app.use('/game', gameRouter);

app.get('/', (_req: Request, res: Response) => {
  res.send({
    message: 'Welcome to the API'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${address}`);
});

export default app;
