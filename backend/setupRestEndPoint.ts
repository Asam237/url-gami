import express, { Application } from "express";
import { UrlRoute } from "./src/routes/url.route";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerDoc from "./src/swagger.json";
import cors from "cors";

export const setupRestEndPoint = (app: Application) => {
  app.use(express.json());
  app.use("/", UrlRoute());
  app.use(cors());
  app.use(express.json())
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
};
