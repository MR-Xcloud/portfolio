#!/bin/bash

# Server Setup Script for Anurag Sharma Portfolio
# Run this script on your fresh server

set -e

echo "🚀 Setting up server for Portfolio deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

print_header() {
    echo -e "${BLUE}[SETUP]${NC} $1"
}

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    print_error "Please don't run this script as root. Use a regular user with sudo privileges."
    exit 1
fi

# Function to install Docker
install_docker() {
    print_header "Installing Docker..."
    
    if command -v docker &> /dev/null; then
        print_status "Docker is already installed"
        return
    fi
    
    print_status "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    
    print_status "Docker installed successfully!"
    print_warning "You may need to logout and login again for Docker group changes to take effect"
}

# Function to install Docker Compose
install_docker_compose() {
    print_header "Installing Docker Compose..."
    
    if command -v docker-compose &> /dev/null; then
        print_status "Docker Compose is already installed"
        return
    fi
    
    print_status "Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    
    print_status "Docker Compose installed successfully!"
}

# Function to install additional tools
install_tools() {
    print_header "Installing additional tools..."
    
    sudo apt update
    sudo apt install -y git curl wget htop ufw certbot python3-certbot-nginx
    
    print_status "Additional tools installed!"
}

# Function to configure firewall
configure_firewall() {
    print_header "Configuring firewall..."
    
    sudo ufw allow ssh
    sudo ufw allow 80
    sudo ufw allow 443
    sudo ufw --force enable
    
    print_status "Firewall configured!"
}

# Function to clone and deploy application
deploy_application() {
    print_header "Deploying application..."
    
    # Check if repository URL is provided
    if [ -z "$1" ]; then
        print_error "Please provide your repository URL"
        echo "Usage: $0 <repository-url>"
        echo "Example: $0 https://github.com/yourusername/portfolio.git"
        exit 1
    fi
    
    REPO_URL=$1
    
    # Clone repository
    print_status "Cloning repository..."
    git clone $REPO_URL portfolio
    cd portfolio
    
    # Make deployment script executable
    chmod +x deploy.sh
    
    # Deploy production environment
    print_status "Starting production deployment..."
    ./deploy.sh prod
    
    print_status "Application deployed successfully!"
}

# Function to setup SSL (optional)
setup_ssl() {
    print_header "SSL Setup (Optional)"
    
    read -p "Do you have a domain name pointing to this server? (y/n): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter your domain name (e.g., yourdomain.com): " DOMAIN
        
        if [ ! -z "$DOMAIN" ]; then
            print_status "Setting up SSL for $DOMAIN..."
            
            # Stop nginx temporarily
            docker-compose -f docker-compose.prod.yml stop nginx
            
            # Get SSL certificate
            sudo certbot certonly --standalone -d $DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN
            
            # Update nginx config for SSL
            print_status "Updating nginx configuration for SSL..."
            
            # Create SSL nginx config
            cat > nginx-ssl.conf << EOF
events {
    worker_connections 1024;
}

http {
    upstream frontend {
        server frontend:3000;
    }

    upstream backend {
        server backend:8001;
    }

    server {
        listen 80;
        server_name $DOMAIN;
        return 301 https://\$server_name\$request_uri;
    }

    server {
        listen 443 ssl;
        server_name $DOMAIN;

        ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;

        # Frontend routes
        location / {
            proxy_pass http://frontend;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }

        # API routes
        location /api/ {
            proxy_pass http://backend/api/;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }

        # Health check
        location /health {
            proxy_pass http://backend/api/health;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }
    }
}
EOF
            
            # Update docker-compose.prod.yml to mount SSL certificates
            sed -i 's|./nginx.conf:/etc/nginx/nginx.conf:ro|./nginx-ssl.conf:/etc/nginx/nginx.conf:ro|g' docker-compose.prod.yml
            
            # Restart services
            docker-compose -f docker-compose.prod.yml up -d
            
            print_status "SSL setup completed! Your site is now available at https://$DOMAIN"
        fi
    else
        print_status "Skipping SSL setup. Your site will be available at http://$(curl -s ifconfig.me)"
    fi
}

# Function to show final instructions
show_final_instructions() {
    print_header "Setup Complete!"
    
    echo ""
    echo "🎉 Your portfolio is now live!"
    echo ""
    echo "📱 Access your application:"
    if [ ! -z "$DOMAIN" ]; then
        echo "   https://$DOMAIN"
    else
        echo "   http://$(curl -s ifconfig.me)"
    fi
    echo ""
    echo "🔧 Useful commands:"
    echo "   cd portfolio"
    echo "   ./deploy.sh status    # Check service status"
    echo "   ./deploy.sh logs-prod # View logs"
    echo "   ./deploy.sh stop      # Stop services"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Update your domain DNS to point to this server"
    echo "   2. Configure your portfolio content in the code"
    echo "   3. Set up automatic backups"
    echo "   4. Monitor your application"
    echo ""
}

# Main setup function
main() {
    print_header "Starting server setup..."
    
    # Install Docker
    install_docker
    
    # Install Docker Compose
    install_docker_compose
    
    # Install additional tools
    install_tools
    
    # Configure firewall
    configure_firewall
    
    # Deploy application
    if [ ! -z "$1" ]; then
        deploy_application $1
    fi
    
    # Setup SSL
    setup_ssl
    
    # Show final instructions
    show_final_instructions
}

# Check if help is requested
if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    echo "Usage: $0 [repository-url]"
    echo ""
    echo "This script will:"
    echo "  1. Install Docker and Docker Compose"
    echo "  2. Install additional tools (git, curl, ufw, certbot)"
    echo "  3. Configure firewall"
    echo "  4. Deploy your portfolio application"
    echo "  5. Setup SSL certificate (if domain provided)"
    echo ""
    echo "Example:"
    echo "  $0 https://github.com/yourusername/portfolio.git"
    exit 0
fi

# Run main setup
main $1 