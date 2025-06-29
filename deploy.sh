#!/bin/bash

# Anurag Sharma Portfolio Deployment Script

set -e

echo "🚀 Starting Portfolio Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Function to deploy development environment
deploy_dev() {
    print_status "Deploying development environment..."
    docker-compose down
    docker-compose up --build -d
    print_status "Development environment deployed!"
    print_status "Frontend: http://localhost:3000"
    print_status "Backend API: http://localhost:8001"
    print_status "API Docs: http://localhost:8001/docs"
}

# Function to deploy production environment
deploy_prod() {
    print_status "Deploying production environment..."
    docker-compose -f docker-compose.prod.yml down
    docker-compose -f docker-compose.prod.yml up --build -d
    print_status "Production environment deployed!"
    print_status "Application: http://localhost"
    print_status "API: http://localhost/api/"
}

# Function to stop all services
stop_services() {
    print_status "Stopping all services..."
    docker-compose down
    docker-compose -f docker-compose.prod.yml down
    print_status "All services stopped!"
}

# Function to view logs
view_logs() {
    print_status "Viewing logs..."
    if [ "$1" = "prod" ]; then
        docker-compose -f docker-compose.prod.yml logs -f
    else
        docker-compose logs -f
    fi
}

# Function to clean up Docker
cleanup() {
    print_warning "Cleaning up Docker resources..."
    docker system prune -f
    docker volume prune -f
    print_status "Cleanup completed!"
}

# Function to show status
show_status() {
    print_status "Checking service status..."
    echo ""
    echo "Development services:"
    docker-compose ps
    echo ""
    echo "Production services:"
    docker-compose -f docker-compose.prod.yml ps
}

# Function to show help
show_help() {
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  dev     - Deploy development environment"
    echo "  prod    - Deploy production environment"
    echo "  stop    - Stop all services"
    echo "  logs    - View logs (dev environment)"
    echo "  logs-prod - View logs (production environment)"
    echo "  status  - Show service status"
    echo "  cleanup - Clean up Docker resources"
    echo "  help    - Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 dev      # Deploy development environment"
    echo "  $0 prod     # Deploy production environment"
    echo "  $0 logs     # View development logs"
    echo "  $0 stop     # Stop all services"
}

# Main script logic
case "${1:-help}" in
    dev)
        deploy_dev
        ;;
    prod)
        deploy_prod
        ;;
    stop)
        stop_services
        ;;
    logs)
        view_logs "dev"
        ;;
    logs-prod)
        view_logs "prod"
        ;;
    status)
        show_status
        ;;
    cleanup)
        cleanup
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        echo ""
        show_help
        exit 1
        ;;
esac 