import Koa from "koa";
import Router from "koa-router";
import koaBody from 'koa-body';
//import * as cors from '@koa/cors';
import * as mongoose from 'mongoose';

import koaLogger from "koa-logger";
import * as json from "koa-json";

import { logger } from './services';
import { config } from './config';
import { routes } from './routes';

// some useful stuff for later
const serve = require('koa-static');
const koaValidator = require('koa-async-validator');
const koaSwagger = require('koa2-swagger-ui');
const koaBunyanLogger = require('koa-bunyan-logger');
const cors = require('@koa/cors');

const app = new Koa();

app.use(koaBody());
app.use(koaValidator());
app.use(cors());
app.use(koaBunyanLogger(logger));
app.use(koaLogger());
app.use(koaBunyanLogger.requestLogger());
app.use(koaBunyanLogger.timeContext());
app.use(serve('public'));

routes.forEach(route => route.initialize(app));

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useCreateIndex: true
// });

export const server = app.listen(config.port);

console.log(`Server running on port ${config.port}`);