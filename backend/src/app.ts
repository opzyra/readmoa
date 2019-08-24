import "reflect-metadata";
import "./env";

import express from "express";
import bodyParser from "body-parser";
import { createConnection } from "typeorm";

import routes from "./routes";
import { endpoint, error } from "./core/errorHandler";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);
app.use(endpoint, error);

const initialize = async function() {
  await createConnection();
};

initialize();

export default app;
