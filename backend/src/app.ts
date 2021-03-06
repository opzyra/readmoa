import "reflect-metadata";
import "./env";

import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import { createConnection } from "typeorm";

import routes from "./routes";
import { endpoint, error } from "./core/errorHandler";

import parsing from "./batch";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

app.use(routes);
app.use(endpoint, error);

const initialize = async function() {
  await createConnection();
  parsing();
};

initialize();

export default app;
