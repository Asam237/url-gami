CREATE TABLE IF NOT EXISTS "url" (
	"id" serial PRIMARY KEY NOT NULL,
	"original_url" varchar(255),
	"short_code" varchar(255),
	"created_at" timestamp DEFAULT now()
);
