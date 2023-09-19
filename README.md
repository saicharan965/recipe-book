# Recipe Book App

A web application for managing and sharing recipes.

## Features

- User registration and authentication
- Create, edit, and delete recipes
- Search and filter recipes
- Responsive design

## Tech Stack

- Angular ✔
- Node.js ✔
- Express.js ✔
- MongoDB ✔
- Auth0 ✔
- Redis[🕒 implementation on the way]

## Usage

1. Clone the repository.
2. Install dependencies.
3. Start the server by using `npm run server`
4. Start the frontend by using `ng serve`

## API Endpoints

- GET /recipes
- GET /recipes/:id
- POST /recipes
- PUT /recipes/:id
- DELETE /recipes/:id

## Authentication

- Secure user registration and authentication using Auth0.

## Database

- MongoDB for storing recipes and user data.

## Project Structure

- `/`: Frontend Angular app.
- `/backend/`: Backend Node.js app.
- `API.md`: Detailed API documentation.
