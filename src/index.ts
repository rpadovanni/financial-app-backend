import express from 'express';
import cors from 'cors';
import routes from './routes/routes';
import authenticationMiddleware from './middlewares/Authentication';

const app = express();

app.use(cors());
app.use(express.json());
app.use(authenticationMiddleware);
app.use(routes);

console.log('Secret: ', process.env.JWT_SECRET);
console.log('NODE_ENV: ', process.env.NODE_ENV);

app.listen(process.env.PORT || 3333);
