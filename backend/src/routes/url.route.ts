import { Router } from "express";
import urlController from "../controllers/url.controller";

export const UrlRoute = () => {
  const router = Router();
  const prefix: string = "/shortener";
  router.post(`${prefix}/create`, urlController.create);
  router.get(`${prefix}/:short_code`, urlController.redirect);
  return router;
};
