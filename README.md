# Auth API – Easygenerator

A secure and extensible authentication API built with NestJS, following industry best practices and production-grade standards. This service was developed as part of a technical assessment for Easygenerator.

---

## Features

- User registration and login with hashed passwords using **bcrypt**
- JWT-based authentication with configurable expiration
- Environment variable validation at startup using `@nestjs/config` and `Joi`
- API documentation with **Swagger** (OpenAPI)
- Security best practices: input validation, HTTP headers, password hashing, and error handling
- Custom global **exception filter** for unified error responses
- Logging using built-in **NestJS Logger**
- Unit testing with **Jest**
- MongoDB integration via **Typegoose**

---

## Tech Stack

| Layer          | Tool/Library         |
|----------------|----------------------|
| Framework      | NestJS (TypeScript)  |
| Database       | MongoDB + Typegoose   |
| Auth           | JWT, Bcrypt          |
| Config         | @nestjs/config, Joi  |
| Testing        | Jest                 |
| Documentation  | Swagger (via `@nestjs/swagger`) |

---

## Installation

```bash
git clone https://github.com/MahmoudMowiena/Auth-API-Easygenerator.git
cd Auth-API-Easygenerator
npm install
```

---

## Environment Variables

Create a `.env` file while taking the `.env.example` file as a reference:

Validation is enforced using a Joi schema in the `config/` module.

---

## Security Features

- Passwords are **hashed with bcrypt** before being stored
- JWT tokens issued on successful login
- Uses `class-validator` and `class-transformer` for DTO validation
- Global **exception filter** to avoid leaking sensitive details
- All config values validated with `Joi`
- API access protected using `AuthGuard` with JWT strategy

---

## API Documentation

After running the app, access Swagger at:

```
http://localhost:3000/api/docs
```

It includes all available endpoints, request/response schemas, and error responses.

---

## Testing

Run unit tests using:

```bash
npm run test
```

Tests cover core services and utility functions.

---

## Available Endpoints

| Method | Endpoint        | Description                | Auth Required |
|--------|------------------|----------------------------|---------------|
| POST   | /auth/signup     | Register a new user        | ❌            |
| POST   | /auth/login      | Authenticate user and get token | ❌      |
| GET    | /users/profile   | Get user profile info      | ✅ JWT        |

---

## Commands

- `npm run start:dev` — Run in watch mode
- `npm run build` — Compile the app
- `npm run test` — Run unit tests

---

## License

MIT License

---

## Author

Mahmoud Mowiena – [GitHub](https://github.com/MahmoudMowiena)

