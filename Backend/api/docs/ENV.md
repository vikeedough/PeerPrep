# Environment Variables

These variables configure authentication and database access. See `.env.example` for a template.

- `SUPABASE_JWT_URL` (required)
  - JWKS URL used to verify RS256 JWTs, e.g. `https://<project>.supabase.co/auth/v1/certs`.

- `SUPABASE_JWT_AUD` (required)
  - Expected audience claim for tokens (e.g. `authenticated`).

- `MONGODB_URI` (required)
  - Standard MongoDB connection string.

- `MONGODB_NAME` (optional)
  - Database name. Default: `QuestionService`.

- `MONGODB_COLLECTION` (optional)
  - Collection to read questions from. Default: `questions`.

- `PORT` (optional)
  - HTTP port for the server. Default: `4000`.

## CORS

`src/main.ts` enables CORS with `origin: 'localhost:3000'`. For local dev, prefer `http://localhost:3000`. Consider making this configurable per environment.

