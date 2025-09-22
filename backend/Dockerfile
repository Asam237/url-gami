FROM node:18-alpine AS development

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY tsconfig.json ./
COPY drizzle.config.ts ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Create .env from example if it doesn't exist
RUN if [ ! -f .env ]; then cp .env.example .env; fi

# Expose the port
EXPOSE 3010

# Start the application
CMD ["npm", "run", "serve"]