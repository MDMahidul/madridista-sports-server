import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// main route
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Madridista!');
});

//global error handler
app.use(globalErrorHandler);

//not found route
app.use(notFound);

export default app;
