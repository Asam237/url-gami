import express from "express";
import {connectToDatabase} from "./startup/db";
import {setupRestEndPoint} from "../setupRestEndPoint";
import {PORT} from "./startup/config";

const app = express();
connectToDatabase();
setupRestEndPoint(app);

export const server = app.listen(PORT, () => {
  console.log(`[SERVER]: running to ${PORT}`);
});
