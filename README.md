# Anurag Sharma Portfolio

A full-stack portfolio application built with React frontend and FastAPI backend.

## Architecture

- **Frontend**: React with Tailwind CSS
- **Backend**: FastAPI (Python)
- **Database**: In-memory storage (can be extended to use MongoDB/PostgreSQL)

## Quick Start with Docker

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Start the application**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8001
   - API Documentation: http://localhost:8001/docs

### Production Setup

1. **Deploy with nginx reverse proxy**
   ```bash
   docker-compose -f docker-compose.prod.yml up --build -d
   ```

2. **Access the application**
   - Main application: http://localhost (or your server IP)
   - API endpoints: http://localhost/api/

## Docker Commands

### Development
```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Rebuild and start
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f
```

### Production
```bash
# Start production services
docker-compose -f docker-compose.prod.yml up -d

# Stop production services
docker-compose -f docker-compose.prod.yml down

# View production logs
docker-compose -f docker-compose.prod.yml logs -f
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/portfolio/info` - Portfolio information
- `GET /api/portfolio/skills` - Technical skills
- `GET /api/portfolio/projects` - Portfolio projects
- `GET /api/portfolio/experience` - Work experience
- `GET /api/portfolio/education` - Education details
- `GET /api/portfolio/certificates` - Certifications
- `POST /api/portfolio/contact` - Submit contact message
- `POST /api/portfolio/project-view` - Track project views
- `GET /api/portfolio/stats` - Portfolio statistics

## Environment Variables

### Frontend
- `REACT_APP_API_URL`: Backend API URL (default: http://localhost:8001)

### Backend
- `PYTHONUNBUFFERED`: Set to 1 for better logging in Docker

## Deployment on Server

1. **SSH into your server**
   ```bash
   ssh user@your-server-ip
   ```

2. **Install Docker and Docker Compose**
   ```bash
   # For Ubuntu/Debian
   sudo apt update
   sudo apt install docker.io docker-compose
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

3. **Clone and deploy**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   docker-compose -f docker-compose.prod.yml up -d --build
   ```

4. **Configure firewall (if needed)**
   ```bash
   sudo ufw allow 80
   sudo ufw allow 443
   ```

## Monitoring and Maintenance

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Update application
```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose -f docker-compose.prod.yml up -d --build
```

### Backup and restore
```bash
# Create backup
docker-compose exec backend python -c "import json; print(json.dumps(contact_messages))" > backup.json

# Restore (if needed)
# Add restore logic to your application
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Check what's using the port
   sudo lsof -i :80
   sudo lsof -i :3000
   sudo lsof -i :8001
   ```

2. **Docker build fails**
   ```bash
   # Clean up Docker cache
   docker system prune -a
   docker-compose build --no-cache
   ```

3. **Services not starting**
   ```bash
   # Check service status
   docker-compose ps
   
   # Check logs
   docker-compose logs
   ```

### Performance Optimization

1. **Enable Docker BuildKit**
   ```bash
   export DOCKER_BUILDKIT=1
   docker-compose up --build
   ```

2. **Use multi-stage builds** (for production)
   - Modify Dockerfiles to use multi-stage builds
   - Reduce final image size

## Security Considerations

1. **Update environment variables** for production
2. **Configure SSL/TLS** certificates
3. **Set up proper firewall rules**
4. **Regular security updates**
5. **Database security** (if using external database)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker
5. Submit a pull request

## License

This project is licensed under the MIT License.
