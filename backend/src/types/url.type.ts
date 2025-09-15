import { InferInsertModel } from 'drizzle-orm';
import { url } from '../schemas/url.schema';

export type Url = typeof url;
export type UrlInput = InferInsertModel<typeof url>;
