import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

app.use('/', routes);
app.get('/', (req: express.Request, res: express.Response): void => {
   res.status(200).send('hello world from this server');
   return;
});

app.listen(port, () => {
  console.log(`server start at http://localhost:${port}`);
});
export default app;
