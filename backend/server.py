from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
import os
from datetime import datetime
import uvicorn

# Initialize FastAPI app
app = FastAPI(
    title="Anurag Sharma Portfolio API",
    description="Backend API for Anurag Sharma's Portfolio Website",
    version="1.0.0",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class ContactMessage(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class ProjectView(BaseModel):
    project_name: str
    timestamp: datetime = datetime.now()

# In-memory storage (replace with database in production)
contact_messages = []
project_views = []

# API Routes

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "Portfolio API is running"}

@app.get("/api/portfolio/info")
async def get_portfolio_info():
    """Get basic portfolio information"""
    return {
        "name": "Anurag Sharma",
        "title": "Backend Developer & Data Enthusiast",
        "location": "Greater Noida, India",
        "email": "nishb9285@gmail.com",
        "phone": "+91 7668154063",
        "linkedin": "https://linkedin.com/in/anurag-sharma-009314175",
        "experience_years": 1,
        "projects_count": 4,
        "certifications_count": 7
    }

@app.get("/api/portfolio/skills")
async def get_skills():
    """Get technical skills"""
    return {
        "languages": ["Python", "R", "SQL"],
        "frameworks": ["Django", "Django REST Framework", "Flask"],
        "databases": ["PostgreSQL", "MySQL", "SQLite3", "Vector Database"],
        "cloud": ["AWS", "Docker", "S3 Bucket"],
        "aiml": ["LLM Models", "RAG", "Langchain", "OpenCV", "NLP", "Machine Learning"],
        "tools": ["Git", "BitBucket", "Power BI", "APPIAN Low Code"]
    }

@app.get("/api/portfolio/projects")
async def get_projects():
    """Get portfolio projects"""
    return [
        {
            "id": 1,
            "title": "AI IngredientIQ",
            "description": "AI-powered food analysis application that scans ingredient lists in packaged products and provides real-time health insights. Features include dietary restrictions, allergen alerts, nutrition analysis, and personalized dietary recommendations.",
            "technologies": ["Python", "AI/ML", "Computer Vision", "NLP"],
            "features": ["Real-time ingredient scanning", "Health insights", "Allergen alerts", "Personalized recommendations"],
            "status": "Completed",
            "year": "2024"
        },
        {
            "id": 2,
            "title": "Royal Teaching Platform",
            "description": "Educational platform where multiple teachers can create accounts, set their rates, and be discovered by students. Includes parent access to monitor their children's learning progress and records.",
            "technologies": ["Django", "PostgreSQL", "REST API", "Authentication"],
            "features": ["Multi-teacher support", "Rate management", "Parent dashboard", "Student tracking"],
            "status": "Completed",
            "year": "2024"
        },
        {
            "id": 3,
            "title": "Jarvis Assistant (LLO Co-pilot)",
            "description": "Contributed to the development of a voice-activated AI assistant specializing in speech-to-text processing and voice activation. Designed and implemented seamless user interactions and real-time responsiveness.",
            "technologies": ["Python", "Speech Processing", "AI/ML", "Real-time Systems"],
            "features": ["Voice activation", "Speech-to-text", "Real-time processing", "Seamless interactions"],
            "status": "Completed",
            "year": "2023"
        },
        {
            "id": 4,
            "title": "AI Body Tracking",
            "description": "Developed an AI model to track body movement for court representations of particular exercises. Uses computer vision and machine learning for accurate movement analysis.",
            "technologies": ["Python", "OpenCV", "Machine Learning", "Computer Vision"],
            "features": ["Movement tracking", "Exercise analysis", "Court representation", "Real-time feedback"],
            "status": "Completed",
            "year": "2023"
        }
    ]

@app.get("/api/portfolio/experience")
async def get_experience():
    """Get work experience"""
    return [
        {
            "position": "Backend Developer",
            "company": "WebMobril Technologies",
            "location": "Noida, India",
            "start_date": "June 2024",
            "end_date": "Present",
            "description": "Develop and maintain scalable applications using Django and Django Rest Framework. Design robust RESTful APIs, optimize database queries, and implement authentication systems.",
            "responsibilities": [
                "Handle cloud deployment on AWS with focus on performance optimization",
                "Work with PostgreSQL, MySQL, and SQLite3 databases",
                "Implement Docker containerization and Git version control",
                "Manage S3 Bucket integration and BitBucket repositories"
            ],
            "technologies": ["Python", "Django", "DRF", "PostgreSQL", "MySQL", "SQLite3", "AWS", "Docker", "Git", "S3 Bucket", "BitBucket"]
        }
    ]

@app.get("/api/portfolio/education")
async def get_education():
    """Get education information"""
    return [
        {
            "degree": "Bachelor of Technology",
            "institution": "G.L BAJAJ GROUP OF INSTITUTIONS",
            "location": "Mathura, Uttar Pradesh",
            "start_year": "2020",
            "end_year": "2024",
            "status": "Completed"
        }
    ]

@app.get("/api/portfolio/certificates")
async def get_certificates():
    """Get certifications"""
    return [
        {"name": "Database Engineer", "status": "Completed"},
        {"name": "Data Science", "status": "Completed"},
        {"name": "Front-end Development", "status": "Completed"},
        {"name": "Python Bootcamp", "status": "Completed"},
        {"name": "Introduction to AWS", "status": "Completed"},
        {"name": "APPIAN Low Code", "status": "Completed"},
        {"name": "Data Science Course", "status": "Completed"}
    ]

@app.post("/api/portfolio/contact")
async def submit_contact_message(message: ContactMessage):
    """Submit a contact message"""
    try:
        # Add timestamp
        message_data = {
            "id": len(contact_messages) + 1,
            "name": message.name,
            "email": message.email,
            "subject": message.subject,
            "message": message.message,
            "timestamp": datetime.now().isoformat(),
            "status": "new"
        }
        
        contact_messages.append(message_data)
        
        return {
            "success": True,
            "message": "Thank you for your message! I'll get back to you soon.",
            "id": message_data["id"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to submit message: {str(e)}")

@app.post("/api/portfolio/project-view")
async def track_project_view(view: ProjectView):
    """Track project views"""
    try:
        view_data = {
            "id": len(project_views) + 1,
            "project_name": view.project_name,
            "timestamp": view.timestamp.isoformat()
        }
        
        project_views.append(view_data)
        
        return {"success": True, "message": "Project view tracked"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to track view: {str(e)}")

@app.get("/api/portfolio/stats")
async def get_portfolio_stats():
    """Get portfolio statistics"""
    return {
        "total_projects": 4,
        "total_certifications": 7,
        "experience_years": 1,
        "total_contact_messages": len(contact_messages),
        "total_project_views": len(project_views),
        "last_updated": datetime.now().isoformat()
    }

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Anurag Sharma Portfolio API", "status": "running"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)