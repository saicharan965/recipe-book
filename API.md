# Recipe Book App API Documentation

## Endpoints

- **GET /recipes**: Get user-specific recipes.
- **GET /recipes/:id**: Get a recipe by ID.
- **POST /recipes**: Create a new recipe.
- **PUT /recipes/:id**: Update a recipe by ID.
- **DELETE /recipes/:id**: Delete a recipe by ID.

## Authentication

- Auth0 authentication is required for access.

## Base URL

- Base URL: `http://localhost:3000/api`

## Response Codes

- `200`: OK
- `201`: Created
- `204`: No Content
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Internal Server Error
