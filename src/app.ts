import express from 'express';
import bodyparser from 'body-parser';
import { db } from './daos/db';
import { userRouter } from './routers/user-router';

const app = express();

const port = process.env.port || 3002;
app.set('port', port);

// Middleware Registration
app.use(bodyparser.json());

// Router Registration
app.use('/ers_user', userRouter);

app.listen(port, () => {
    console.log(`Expense Reinbursment System is running at http://localhost:${port}`);
})