import express, { Express, Request, Response } from 'express';
const morgan = require('morgan');
const app = express();
const authRouter = require('./routes/auth.route.ts');
const clientRouter = require('./routes/client.route.ts')

app.use(morgan('dev'));
app.use(express.json());

app.use("/api/V1", authRouter);
app.use("/api/V1", clientRouter);




app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Not found' });
  });


app.use((err: Error, req: Request, res: Response) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
  });

module.exports = app;




