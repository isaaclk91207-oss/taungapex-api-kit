# TaungApex API Kit

[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Prisma](https://img.shields.io/badge/Prisma-7.8-2D3748.svg)](https://www.prisma.io/)
[![Express](https://img.shields.io/badge/Express-5.2-000000.svg)](https://expressjs.com/)

A RESTful API starter kit built with Express.js, TypeScript, and Prisma — featuring authentication, role-based access control, OTP verification, and API logging.

## Features

- **Authentication** — JWT access & refresh token flow
- **OTP Verification** — Email/password reset, login verification
- **Role-Based Access Control (RBAC)** — Roles and granular permissions
- **API Logging** — Request method, endpoint, status, IP, user agent, duration
- **Swagger Docs** — Auto-generated API documentation at `/api-docs`
- **Security** — Helmet, CORS, input validation
- **File Upload** — Multer integration ready

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express 5 | Web framework |
| TypeScript | Type safety |
| Prisma | ORM |
| MySQL | Database |
| Helmet | Security headers |
| CORS | Cross-origin requests |
| Morgan | HTTP logging |
| Swagger | API documentation |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT auth |

## Project Structure

```
taungapex-api-kit/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── config/
│   │   └── index.ts
│   ├── app.ts
│   └── server.ts
├── .env
├── .gitignore
├── LICENSE
├── package.json
├── prisma.config.ts
└── tsconfig.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MySQL](https://www.mysql.com/)
- npm or yarn

### Installation

```bash
git clone https://github.com/isaaclk91207-oss/taungapex-api-kit.git
cd taungapex-api-kit
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
PORT=3000
DATABASE_URL="mysql://user:password@localhost:3306/db"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"
SMTP_HOST=""
SMTP_PORT=587
SMTP_USER=""
SMTP_PASS=""
```

### Database Migration

```bash
npx prisma generate
npx prisma migrate dev
```

### Run the Server

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

Server runs at `http://localhost:3000` and API docs at `http://localhost:3000/api-docs`.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with hot-reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run compiled production build |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:studio` | Open Prisma Studio (DB GUI) |

## Database Models

- **User** — id, email, password, name, phone, isActive, roleId
- **Role** — id, name, description (linked to permissions)
- **Permission** — id, name, module, action
- **RefreshToken** — id, token, userId, expiresAt
- **OtpCode** — id, code, userId, type, expiresAt, isUsed
- **ApiLog** — id, userId, method, endpoint, statusCode, ipAddress, userAgent, duration

## API Documentation

After starting the server, visit:

```
http://localhost:3000/api-docs
```

Swagger UI provides interactive documentation for all registered routes.

## Health Check

```bash
curl http://localhost:3000/health
```

Response:
```json
{ "status": "ok", "timestamp": "2026-07-06T00:00:00.000Z" }
```

## Author

**Ei Thazin Htay**

## License

This project is licensed under the [MIT License](LICENSE).
