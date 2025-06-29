import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'certificates', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const skills = {
    languages: ['Python', 'R', 'SQL'],
    frameworks: ['Django', 'Django REST Framework', 'Flask'],
    databases: ['PostgreSQL', 'MySQL', 'SQLite3', 'Vector Database'],
    cloud: ['AWS', 'Docker', 'S3 Bucket'],
    aiml: ['LLM Models', 'RAG', 'Langchain', 'OpenCV', 'NLP', 'Machine Learning'],
    tools: ['Git', 'BitBucket', 'Power BI', 'APPIAN Low Code']
  };

  const projects = [
    {
      title: 'AI IngredientIQ',
      description: 'AI-powered food analysis application that scans ingredient lists in packaged products and provides real-time health insights. Features include dietary restrictions, allergen alerts, nutrition analysis, and personalized dietary recommendations.',
      technologies: ['Python', 'AI/ML', 'Computer Vision', 'NLP'],
      image: 'https://images.unsplash.com/photo-1660165458059-57cfb6cc87e5',
      features: ['Real-time ingredient scanning', 'Health insights', 'Allergen alerts', 'Personalized recommendations']
    },
    {
      title: 'Royal Teaching Platform',
      description: 'Educational platform where multiple teachers can create accounts, set their rates, and be discovered by students. Includes parent access to monitor their children\'s learning progress and records.',
      technologies: ['Django', 'PostgreSQL', 'REST API', 'Authentication'],
      image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3',
      features: ['Multi-teacher support', 'Rate management', 'Parent dashboard', 'Student tracking']
    },
    {
      title: 'Jarvis Assistant (LLO Co-pilot)',
      description: 'Contributed to the development of a voice-activated AI assistant specializing in speech-to-text processing and voice activation. Designed and implemented seamless user interactions and real-time responsiveness.',
      technologies: ['Python', 'Speech Processing', 'AI/ML', 'Real-time Systems'],
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b',
      features: ['Voice activation', 'Speech-to-text', 'Real-time processing', 'Seamless interactions']
    },
    {
      title: 'AI Body Tracking',
      description: 'Developed an AI model to track body movement for court representations of particular exercises. Uses computer vision and machine learning for accurate movement analysis.',
      technologies: ['Python', 'OpenCV', 'Machine Learning', 'Computer Vision'],
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      features: ['Movement tracking', 'Exercise analysis', 'Court representation', 'Real-time feedback']
    }
  ];

  const certificates = [
    'Database Engineer',
    'Data Science',
    'Front-end Development',
    'Python Bootcamp',
    'Introduction to AWS',
    'APPIAN Low Code',
    'Data Science Course'
  ];

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">Anurag Sharma</span>
          </div>
          
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            {['home', 'about', 'skills', 'projects', 'experience', 'education', 'certificates', 'contact'].map((item) => (
              <button
                key={item}
                className={`nav-link ${activeSection === item ? 'active' : ''}`}
                onClick={() => scrollToSection(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-background">
          <img src="https://images.unsplash.com/photo-1591439657848-9f4b9ce436b9" alt="Code Background" />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="gradient-text">Anurag Sharma</span>
            </h1>
            <h2 className="hero-subtitle">Backend Developer & Data Enthusiast</h2>
            <p className="hero-description">
              Transforming Data into Insights | Python & Django Specialist | Building Scalable Solutions
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => scrollToSection('projects')}>
                View My Work
              </button>
              <button className="btn-secondary" onClick={() => scrollToSection('contact')}>
                Get In Touch
              </button>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p className="about-description">
                I'm a passionate Backend Developer at WebMobril Technologies with expertise in Python, Django, and AI/ML technologies. 
                I specialize in building scalable applications, designing robust RESTful APIs, and implementing cutting-edge AI solutions.
              </p>
              <p className="about-description">
                With a strong foundation in data analysis and machine learning, I transform complex data into actionable insights. 
                My experience spans from developing AI-powered applications to optimizing database performance and cloud deployment.
              </p>
              <div className="about-stats">
                <div className="stat">
                  <span className="stat-number">4+</span>
                  <span className="stat-label">Major Projects</span>
                </div>
                <div className="stat">
                  <span className="stat-number">7+</span>
                  <span className="stat-label">Certifications</span>
                </div>
                <div className="stat">
                  <span className="stat-number">1+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <h2 className="section-title">Technical Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3 className="skill-category-title">Languages</h3>
              <div className="skill-tags">
                {skills.languages.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            
            <div className="skill-category">
              <h3 className="skill-category-title">Frameworks</h3>
              <div className="skill-tags">
                {skills.frameworks.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            
            <div className="skill-category">
              <h3 className="skill-category-title">Databases</h3>
              <div className="skill-tags">
                {skills.databases.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            
            <div className="skill-category">
              <h3 className="skill-category-title">Cloud & DevOps</h3>
              <div className="skill-tags">
                {skills.cloud.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            
            <div className="skill-category">
              <h3 className="skill-category-title">AI/ML</h3>
              <div className="skill-tags">
                {skills.aiml.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            
            <div className="skill-category">
              <h3 className="skill-category-title">Tools</h3>
              <div className="skill-tags">
                {skills.tools.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <div className="project-technologies">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-features">
                    {project.features.map((feature, featureIndex) => (
                      <span key={featureIndex} className="feature-badge">✓ {feature}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience">
        <div className="container">
          <h2 className="section-title">Work Experience</h2>
          <div className="experience-timeline">
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3 className="job-title">Backend Developer</h3>
                  <span className="company">WebMobril Technologies</span>
                  <span className="duration">June 2024 - Present</span>
                  <span className="location">Noida, India</span>
                </div>
                <div className="job-description">
                  <p>
                    Develop and maintain scalable applications using Django and Django Rest Framework. 
                    Design robust RESTful APIs, optimize database queries, and implement authentication systems.
                  </p>
                  <ul className="job-highlights">
                    <li>Handle cloud deployment on AWS with focus on performance optimization</li>
                    <li>Work with PostgreSQL, MySQL, and SQLite3 databases</li>
                    <li>Implement Docker containerization and Git version control</li>
                    <li>Manage S3 Bucket integration and BitBucket repositories</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="education">
        <div className="container">
          <h2 className="section-title">Education</h2>
          <div className="education-grid">
            <div className="education-card">
              <div className="education-header">
                <h3 className="degree">Bachelor of Technology</h3>
                <span className="institution">G.L BAJAJ GROUP OF INSTITUTIONS</span>
                <span className="duration">2020 - 2024</span>
                <span className="location">Mathura, Uttar Pradesh</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="certificates">
        <div className="container">
          <h2 className="section-title">Certifications</h2>
          <div className="certificates-grid">
            {certificates.map((cert, index) => (
              <div key={index} className="certificate-card">
                <div className="certificate-icon">🏆</div>
                <h3 className="certificate-title">{cert}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3 className="contact-subtitle">Let's Connect</h3>
              <p className="contact-description">
                I'm always interested in new opportunities and exciting projects. 
                Feel free to reach out if you'd like to collaborate or just say hello!
              </p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <div className="contact-text">
                    <span className="contact-label">Email</span>
                    <a href="mailto:nitish892383@gmail.com" className="contact-value">nitish892383@gmail.com</a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <span className="contact-icon">📱</span>
                  <div className="contact-text">
                    <span className="contact-label">Phone</span>
                    <a href="tel:+917668154063" className="contact-value">+91 7668154063</a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <div className="contact-text">
                    <span className="contact-label">Location</span>
                    <span className="contact-value">Greater Noida, India</span>
                  </div>
                </div>
                
                <div className="contact-item">
                  <span className="contact-icon">💼</span>
                  <div className="contact-text">
                    <span className="contact-label">LinkedIn</span>
                    <a href="https://www.linkedin.com/in/anurag-sharma-0091b419a/" target="_blank" rel="noopener noreferrer" className="contact-value">https://www.linkedin.com/in/anurag-sharma-0091b419a/</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>&copy; 2024 Anurag Sharma. All rights reserved.</p>
            <p>Built with React & Modern Web Technologies</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;