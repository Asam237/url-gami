import { eq } from "drizzle-orm";
import { url } from "../schemas/url.schema";
import { db } from "../utils/db";
import { generateShortCode } from "../utils/shortener";

const create = async (original_url: string) => {
  const short_code: string = await generateShortCode();
  const resp = await db
    .insert(url)
    .values({ short_code, original_url })
    .returning();
  return resp.length > 0 ? resp[0] : null;
};

const getOriginalUrl = async (short_code: string) => {
  const resp = await db
    .select()
    .from(url)
    .where(eq(url.short_code, short_code))
    .limit(1);
  return resp.length > 0 ? resp[0].original_url : null;
};

export default { create, getOriginalUrl };
