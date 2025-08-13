# J-Vaka Dockerized Application

This document describes how to run the J-Vaka application using Docker containers.

## Prerequisites

- Docker
- Docker Compose

## Architecture

- **Backend**: Spring Boot application with JWT authentication (Port 8080)
- **Frontend**: React application with TypeScript (Port 3000)

## Quick Start

1. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

2. **Start services in detached mode:**
   ```bash
   docker-compose up -d --build
   ```

3. **Stop all services:**
   ```bash
   docker-compose down
   ```

## Individual Service Commands

### Backend Only
```bash
cd backend
docker build -t j-vaka-backend .
docker run -p 8080:8080 j-vaka-backend
```

### Frontend Only
```bash
cd frontend
docker build -t j-vaka-frontend .
docker run -p 3000:80 j-vaka-frontend
```

## Service URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **H2 Database Console**: http://localhost:8080/h2-console

## API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration

### Test Endpoints
- `GET /api/test/all` - Public access
- `GET /api/test/user` - User role required
- `GET /api/test/mod` - Moderator role required
- `GET /api/test/admin` - Admin role required

## Environment Variables

Backend environment variables can be modified in `docker-compose.yml`:

- `APP_JWT_SECRET`: JWT secret key
- `APP_JWT_EXPIRATION_MS`: JWT expiration time in milliseconds
- `SPRING_DATASOURCE_*`: Database configuration

## Development

### Logs
```bash
# View logs for all services
docker-compose logs

# View logs for specific service
docker-compose logs backend
docker-compose logs frontend
```

### Rebuild Services
```bash
# Rebuild specific service
docker-compose build backend
docker-compose build frontend

# Rebuild and restart
docker-compose up --build
```

## Troubleshooting

1. **Port conflicts**: Make sure ports 3000 and 8080 are not in use
2. **Container startup issues**: Check logs with `docker-compose logs [service-name]`
3. **Network issues**: Ensure containers are on the same network (j-vaka-network)

## Production Considerations

- Change default JWT secret
- Use external database instead of H2
- Configure proper CORS origins
- Add SSL/TLS certificates
- Set up proper logging and monitoring