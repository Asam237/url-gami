export interface UrlResponse {
  url: {
    id: number;
    original_url: string;
    short_code: string;
  };
}

export interface SavedUrl {
  id: number;
  original_url: string;
  short_code: string;
  short_url: string;
  created_at: string;
  clicks?: number;
}

export interface ApiError {
  error: string;
}