#!/usr/bin/env python3
import requests
import json
import sys
from datetime import datetime

# Get the backend URL from frontend/.env
BACKEND_URL = "https://44150479-96f2-4666-af07-e5c6fddf26b9.preview.emergentagent.com"

def test_health_endpoint():
    """Test the health check endpoint"""
    print("\n=== Testing Health Check Endpoint ===")
    try:
        response = requests.get(f"{BACKEND_URL}/api/health")
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2)}")
            if data.get("status") == "healthy":
                print("✅ Health check endpoint is working correctly")
                return True
            else:
                print("❌ Health check endpoint returned unexpected data")
                return False
        else:
            print(f"❌ Health check endpoint returned status code {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error testing health check endpoint: {str(e)}")
        return False

def test_portfolio_info_endpoint():
    """Test the portfolio info endpoint"""
    print("\n=== Testing Portfolio Info Endpoint ===")
    try:
        response = requests.get(f"{BACKEND_URL}/api/portfolio/info")
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2)}")
            required_fields = ["name", "title", "location", "email", "phone", "linkedin"]
            if all(field in data for field in required_fields):
                print("✅ Portfolio info endpoint is working correctly")
                return True
            else:
                print("❌ Portfolio info endpoint is missing required fields")
                return False
        else:
            print(f"❌ Portfolio info endpoint returned status code {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error testing portfolio info endpoint: {str(e)}")
        return False

def test_skills_endpoint():
    """Test the skills endpoint"""
    print("\n=== Testing Skills Endpoint ===")
    try:
        response = requests.get(f"{BACKEND_URL}/api/portfolio/skills")
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2)}")
            required_categories = ["languages", "frameworks", "databases", "cloud", "aiml", "tools"]
            if all(category in data for category in required_categories):
                print("✅ Skills endpoint is working correctly")
                return True
            else:
                print("❌ Skills endpoint is missing required categories")
                return False
        else:
            print(f"❌ Skills endpoint returned status code {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error testing skills endpoint: {str(e)}")
        return False

def test_projects_endpoint():
    """Test the projects endpoint"""
    print("\n=== Testing Projects Endpoint ===")
    try:
        response = requests.get(f"{BACKEND_URL}/api/portfolio/projects")
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Found {len(data)} projects")
            if len(data) > 0:
                sample_project = data[0]
                print(f"Sample project: {json.dumps(sample_project, indent=2)}")
                required_fields = ["id", "title", "description", "technologies", "features"]
                if all(field in sample_project for field in required_fields):
                    print("✅ Projects endpoint is working correctly")
                    return True
                else:
                    print("❌ Projects endpoint is missing required fields in project data")
                    return False
            else:
                print("❌ Projects endpoint returned empty list")
                return False
        else:
            print(f"❌ Projects endpoint returned status code {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error testing projects endpoint: {str(e)}")
        return False

def test_experience_endpoint():
    """Test the experience endpoint"""
    print("\n=== Testing Experience Endpoint ===")
    try:
        response = requests.get(f"{BACKEND_URL}/api/portfolio/experience")
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Found {len(data)} experience entries")
            if len(data) > 0:
                sample_experience = data[0]
                print(f"Sample experience: {json.dumps(sample_experience, indent=2)}")
                required_fields = ["position", "company", "location", "start_date", "description", "responsibilities"]
                if all(field in sample_experience for field in required_fields):
                    print("✅ Experience endpoint is working correctly")
                    return True
                else:
                    print("❌ Experience endpoint is missing required fields in experience data")
                    return False
            else:
                print("❌ Experience endpoint returned empty list")
                return False
        else:
            print(f"❌ Experience endpoint returned status code {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error testing experience endpoint: {str(e)}")
        return False

def test_education_endpoint():
    """Test the education endpoint"""
    print("\n=== Testing Education Endpoint ===")
    try:
        response = requests.get(f"{BACKEND_URL}/api/portfolio/education")
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Found {len(data)} education entries")
            if len(data) > 0:
                sample_education = data[0]
                print(f"Sample education: {json.dumps(sample_education, indent=2)}")
                required_fields = ["degree", "institution", "location", "start_year", "end_year"]
                if all(field in sample_education for field in required_fields):
                    print("✅ Education endpoint is working correctly")
                    return True
                else:
                    print("❌ Education endpoint is missing required fields in education data")
                    return False
            else:
                print("❌ Education endpoint returned empty list")
                return False
        else:
            print(f"❌ Education endpoint returned status code {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error testing education endpoint: {str(e)}")
        return False

def test_certificates_endpoint():
    """Test the certificates endpoint"""
    print("\n=== Testing Certificates Endpoint ===")
    try:
        response = requests.get(f"{BACKEND_URL}/api/portfolio/certificates")
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Found {len(data)} certificates")
            if len(data) > 0:
                sample_certificate = data[0]
                print(f"Sample certificate: {json.dumps(sample_certificate, indent=2)}")
                required_fields = ["name", "status"]
                if all(field in sample_certificate for field in required_fields):
                    print("✅ Certificates endpoint is working correctly")
                    return True
                else:
                    print("❌ Certificates endpoint is missing required fields in certificate data")
                    return False
            else:
                print("❌ Certificates endpoint returned empty list")
                return False
        else:
            print(f"❌ Certificates endpoint returned status code {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error testing certificates endpoint: {str(e)}")
        return False

def test_stats_endpoint():
    """Test the stats endpoint"""
    print("\n=== Testing Stats Endpoint ===")
    try:
        response = requests.get(f"{BACKEND_URL}/api/portfolio/stats")
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2)}")
            required_fields = ["total_projects", "total_certifications", "experience_years", "total_contact_messages", "total_project_views", "last_updated"]
            if all(field in data for field in required_fields):
                print("✅ Stats endpoint is working correctly")
                return True
            else:
                print("❌ Stats endpoint is missing required fields")
                return False
        else:
            print(f"❌ Stats endpoint returned status code {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error testing stats endpoint: {str(e)}")
        return False

def test_contact_endpoint():
    """Test the contact endpoint"""
    print("\n=== Testing Contact Endpoint ===")
    try:
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Test Contact Form",
            "message": "This is a test message from the automated testing script."
        }
        response = requests.post(f"{BACKEND_URL}/api/portfolio/contact", json=contact_data)
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2)}")
            if data.get("success") == True and "id" in data:
                print("✅ Contact endpoint is working correctly")
                return True
            else:
                print("❌ Contact endpoint returned unexpected data")
                return False
        else:
            print(f"❌ Contact endpoint returned status code {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error testing contact endpoint: {str(e)}")
        return False

def test_project_view_endpoint():
    """Test the project view tracking endpoint"""
    print("\n=== Testing Project View Tracking Endpoint ===")
    try:
        view_data = {
            "project_name": "AI IngredientIQ",
            "timestamp": datetime.now().isoformat()
        }
        response = requests.post(f"{BACKEND_URL}/api/portfolio/project-view", json=view_data)
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2)}")
            if data.get("success") == True:
                print("✅ Project view tracking endpoint is working correctly")
                return True
            else:
                print("❌ Project view tracking endpoint returned unexpected data")
                return False
        else:
            print(f"❌ Project view tracking endpoint returned status code {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error testing project view tracking endpoint: {str(e)}")
        return False

def run_all_tests():
    """Run all API tests and return results"""
    results = {}
    
    print("\n🔍 Starting Backend API Tests for Anurag Sharma's Portfolio\n")
    print(f"Backend URL: {BACKEND_URL}")
    
    # Test health endpoint
    results["health_check"] = test_health_endpoint()
    
    # Test portfolio endpoints
    results["portfolio_info"] = test_portfolio_info_endpoint()
    results["skills"] = test_skills_endpoint()
    results["projects"] = test_projects_endpoint()
    results["experience"] = test_experience_endpoint()
    results["education"] = test_education_endpoint()
    results["certificates"] = test_certificates_endpoint()
    results["stats"] = test_stats_endpoint()
    
    # Test contact form
    results["contact_form"] = test_contact_endpoint()
    
    # Test project view tracking
    results["project_view_tracking"] = test_project_view_endpoint()
    
    # Print summary
    print("\n=== Test Results Summary ===")
    all_passed = True
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        if not result:
            all_passed = False
        print(f"{test_name}: {status}")
    
    if all_passed:
        print("\n🎉 All tests passed successfully!")
        return 0
    else:
        print("\n❌ Some tests failed. See details above.")
        return 1

if __name__ == "__main__":
    sys.exit(run_all_tests())