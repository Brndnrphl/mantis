import express from 'express';
import dotenv from 'dotenv';
import routes from './routes.js';
import process from 'process';

dotenv.config({ path: '.env' });
const app = express()

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/api/notes', routes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on localhost:${process.env.PORT}`);
  });