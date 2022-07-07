// import modules
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
// import app module
import App from './App';

// import routes
import { AuthRouter, UserRouter } from './router';

const app = new App({
  port: Number(process.env.PORT) || 3040,
  middlewares: [
    express.json({
      limit: '10mb',
    }),
    express.urlencoded({ extended: true }),
    cors(),
    morgan('dev'),
  ],
  routes: [new AuthRouter(), new UserRouter()],
});

app.listen();
