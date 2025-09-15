import { Request, Response } from "express";
import { UrlInput } from "../types/url.type";
import urlService from "../services/url.service";

const create = async (req: Request, res: Response) => {
  const { original_url }: { original_url: string } = req.body;
  if (!original_url) return res.status(400).json({ error: "URL is required" });
  try {
    const newUrl = await urlService.create(original_url);
    if (newUrl) return res.status(201).json({ url: newUrl });
    return res.status(500).json({ error: "Failed to create short URL" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const redirect = async (req: Request, res: Response) => {
  const { short_code } = req.params;

  try {
    const originalUrl = await urlService.getOriginalUrl(short_code);
    if (originalUrl) {
      return res.redirect(301, originalUrl);
    }
    return res.status(404).json({ error: "Short URL not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default { create, redirect };
