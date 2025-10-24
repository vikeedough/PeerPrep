# API Reference

All endpoints require a valid Bearer JWT in the `Authorization` header.

## Authentication

- Header: `Authorization: Bearer <JWT>`
- Verification: RS256 via JWKS at `SUPABASE_JWT_URL` with audience `SUPABASE_JWT_AUD`.

## Endpoints

### GET /auth/me

Returns details from the authenticated user payload.

- Response 200

```json
{
  "user": {
    "id": "...",
    "email": "...",
    "role": "..."
  }
}
```

- Errors
  - 401 Unauthorized – Missing or invalid token

### GET /questions?limit=N

Returns up to `N` question documents from MongoDB. Defaults to 5.

- Query Parameters
  - `limit` (number, optional) – Maximum documents to return

- Response 200

```json
[
  { "_id": "...", "...": "..." },
  { "_id": "...", "...": "..." }
]
```

- Errors
  - 401 Unauthorized – Missing or invalid token

## Examples

```bash
curl -H "Authorization: Bearer $TOKEN" http://localhost:4000/auth/me

curl -H "Authorization: Bearer $TOKEN" "http://localhost:4000/questions?limit=10"
```

