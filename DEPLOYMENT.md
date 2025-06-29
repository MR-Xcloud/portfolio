# 🚀 Live Deployment Guide

## Quick Start (5 minutes)

### 1. Get a Server
- **DigitalOcean**: Create a $5/month droplet
- **AWS**: Launch an EC2 instance (t2.micro is free tier)
- **Google Cloud**: Create a Compute Engine instance
- **Linode**: Create a $5/month Linode

### 2. SSH into Your Server
```bash
ssh root@your-server-ip
```

### 3. Run the Setup Script
```bash
# Download and run the setup script
curl -fsSL https://raw.githubusercontent.com/yourusername/portfolio/main/server-setup.sh -o server-setup.sh
chmod +x server-setup.sh
./server-setup.sh https://github.com/yourusername/portfolio.git
```

### 4. Your Site is Live! 🎉
- **Without domain**: `http://your-server-ip`
- **With domain**: `https://yourdomain.com`

---

## Detailed Step-by-Step Guide

### Step 1: Choose Your Server Provider

#### Option A: DigitalOcean (Recommended for beginners)
1. Go to [digitalocean.com](https://digitalocean.com)
2. Create account and add payment method
3. Click "Create" → "Droplets"
4. Choose:
   - **Image**: Ubuntu 22.04 LTS
   - **Size**: Basic → $5/month (1GB RAM, 1 CPU)
   - **Datacenter**: Choose closest to your audience
   - **Authentication**: SSH key (recommended) or password
5. Click "Create Droplet"

#### Option B: AWS EC2
1. Go to [aws.amazon.com](https://aws.amazon.com)
2. Create account and set up billing
3. Go to EC2 Dashboard
4. Click "Launch Instance"
5. Choose:
   - **AMI**: Ubuntu Server 22.04 LTS
   - **Instance Type**: t2.micro (free tier)
   - **Security Group**: Allow SSH (port 22), HTTP (port 80), HTTPS (port 443)
6. Launch instance

### Step 2: Connect to Your Server

#### Get Your Server IP
- **DigitalOcean**: Dashboard → Droplets → Copy IP
- **AWS**: EC2 Dashboard → Instances → Copy Public IP

#### SSH Connection
```bash
# If you used SSH key
ssh root@your-server-ip

# If you used password
ssh root@your-server-ip
# Enter your password when prompted
```

### Step 3: Deploy Your Application

#### Method 1: Automated Setup (Recommended)
```bash
# Download the setup script
curl -fsSL https://raw.githubusercontent.com/yourusername/portfolio/main/server-setup.sh -o server-setup.sh

# Make it executable
chmod +x server-setup.sh

# Run the setup (replace with your actual GitHub repo URL)
./server-setup.sh https://github.com/yourusername/portfolio.git
```

#### Method 2: Manual Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install additional tools
sudo apt install -y git curl wget ufw certbot python3-certbot-nginx

# Configure firewall
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

# Clone your repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Deploy
chmod +x deploy.sh
./deploy.sh prod
```

### Step 4: Configure Domain (Optional but Recommended)

#### Buy a Domain
- **Namecheap**: $10-15/year
- **GoDaddy**: $10-15/year
- **Google Domains**: $12/year

#### Point Domain to Your Server
1. Go to your domain registrar's DNS settings
2. Add an A record:
   - **Name**: @ (or leave blank)
   - **Value**: Your server IP address
   - **TTL**: 300 (or default)

#### Setup SSL Certificate
```bash
# If you have a domain
sudo certbot certonly --standalone -d yourdomain.com --non-interactive --agree-tos --email your-email@domain.com

# Update nginx config for SSL
# (The setup script will handle this automatically)
```

### Step 5: Verify Deployment

#### Check if Services are Running
```bash
cd portfolio
./deploy.sh status
```

#### Test Your Application
```bash
# Test backend API
curl http://localhost/api/health

# Test frontend (should return HTML)
curl http://localhost
```

#### Check Logs
```bash
# View all logs
./deploy.sh logs-prod

# View specific service logs
docker-compose -f docker-compose.prod.yml logs -f frontend
docker-compose -f docker-compose.prod.yml logs -f backend
```

---

## Post-Deployment

### Update Your Portfolio Content
```bash
# Edit your portfolio information
nano backend/server.py
# Update the portfolio data in the API endpoints

# Rebuild and redeploy
./deploy.sh prod
```

### Set Up Monitoring
```bash
# Install monitoring tools
sudo apt install -y htop iotop

# Monitor system resources
htop
```

### Set Up Backups
```bash
# Create backup script
cat > backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf backup_$DATE.tar.gz portfolio/
echo "Backup created: backup_$DATE.tar.gz"
EOF

chmod +x backup.sh

# Add to crontab for daily backups
crontab -e
# Add this line: 0 2 * * * /home/username/backup.sh
```

### Update Application
```bash
# Pull latest changes
git pull

# Rebuild and restart
./deploy.sh prod
```

---

## Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Check what's using the port
sudo lsof -i :80
sudo lsof -i :443

# Kill the process if needed
sudo kill -9 <PID>
```

#### 2. Docker Permission Issues
```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Logout and login again
exit
# SSH back in
```

#### 3. SSL Certificate Issues
```bash
# Renew certificate
sudo certbot renew

# Check certificate status
sudo certbot certificates
```

#### 4. Application Not Starting
```bash
# Check logs
./deploy.sh logs-prod

# Check Docker status
docker ps -a

# Restart services
./deploy.sh stop
./deploy.sh prod
```

### Performance Optimization

#### 1. Enable Docker BuildKit
```bash
export DOCKER_BUILDKIT=1
./deploy.sh prod
```

#### 2. Monitor Resource Usage
```bash
# Check memory usage
free -h

# Check disk usage
df -h

# Check CPU usage
top
```

#### 3. Optimize Images
```bash
# Clean up unused Docker resources
docker system prune -a

# Remove unused images
docker image prune -a
```

---

## Security Best Practices

### 1. Regular Updates
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Docker images
./deploy.sh prod
```

### 2. Firewall Configuration
```bash
# Check firewall status
sudo ufw status

# Only allow necessary ports
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
```

### 3. SSL/TLS Configuration
```bash
# Force HTTPS redirect
# (Already configured in nginx-ssl.conf)

# Renew certificates automatically
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### 4. Regular Backups
```bash
# Set up automated backups
# (See backup section above)
```

---

## Cost Optimization

### DigitalOcean
- **Basic Droplet**: $5/month
- **Domain**: $10-15/year
- **Total**: ~$75/year

### AWS
- **EC2 t2.micro**: Free tier (12 months)
- **Domain**: $10-15/year
- **Total**: ~$15/year (first year), then ~$60/year

### Google Cloud
- **f1-micro**: Free tier (always free)
- **Domain**: $10-15/year
- **Total**: ~$15/year

---

## Support

If you encounter issues:

1. **Check logs**: `./deploy.sh logs-prod`
2. **Check status**: `./deploy.sh status`
3. **Restart services**: `./deploy.sh stop && ./deploy.sh prod`
4. **Check system resources**: `htop`, `df -h`, `free -h`

For additional help, check the main README.md file or create an issue in the repository. 