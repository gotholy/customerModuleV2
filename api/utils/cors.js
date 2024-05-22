import { allowedOrigins } from "./allowed_origins.js"

export const corsOptions = {
  origin: allowedOrigins,
  credentials: true
}