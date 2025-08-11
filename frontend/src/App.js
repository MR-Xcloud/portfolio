import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

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

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

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
      description: 'AI-powered food analysis application that scans ingredient lists in packaged products and provides real-time health insights.',
      technologies: ['Python', 'AI/ML', 'Computer Vision', 'NLP'],
      image: 'https://images.unsplash.com/photo-1660165458059-57cfb6cc87e5',
      features: ['Real-time ingredient scanning', 'Health insights', 'Allergen alerts']
    },
    {
      title: 'Royal Teaching Platform',
      description: 'Educational platform where multiple teachers can create accounts, set their rates, and be discovered by students.',
      technologies: ['Django', 'PostgreSQL', 'REST API', 'Authentication'],
      image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3',
      features: ['Multi-teacher support', 'Rate management', 'Parent dashboard']
    },
    {
      title: 'Jarvis Assistant (LLM Co-pilot)',
      description: 'Voice-activated AI assistant specializing in speech-to-text processing and voice activation.',
      technologies: ['Python', 'Speech Processing', 'AI/ML', 'Real-time Systems'],
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b',
      features: ['Voice activation', 'Speech-to-text', 'Real-time processing']
    },
    {
      title: 'AI Body Tracking',
      description: 'AI model to track body movement for court representations of particular exercises.',
      technologies: ['Python', 'OpenCV', 'Machine Learning', 'Computer Vision'],
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      features: ['Movement tracking', 'Exercise analysis', 'Court representation']
    },
    {
      title: 'WM Connect',
      description: 'Advanced chat application with real-time messaging, file sharing, and group collaboration features.',
      technologies: ['Django', 'WebSocket', 'PostgreSQL', 'Real-time Communication'],
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935',
      features: ['Real-time messaging', 'File sharing', 'Group chats', 'Message encryption']
    },
    {
      title: 'Search Engine (RAG & LLM)',
      description: 'Intelligent search engine powered by Retrieval-Augmented Generation and Large Language Models for enhanced search results.',
      technologies: ['Python', 'RAG', 'LLM', 'Vector Database', 'NLP'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
      features: ['Semantic search', 'Context-aware results', 'AI-powered responses', 'Knowledge base integration']
    },
    {
      title: 'WMTC Appointment App',
      description: 'Comprehensive appointment management system for assigning counselors to meet with clients efficiently.',
      technologies: ['Django', 'PostgreSQL', 'REST API', 'Scheduling System'],
      image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335',
      features: ['Appointment scheduling', 'Counselor assignment', 'Calendar integration', 'Reminder system']
    },
    {
      title: 'CoachAI',
      description: 'AI-powered coaching platform that helps coaches identify the main ideas and goals of users for personalized guidance.',
      technologies: ['Python', 'AI/ML', 'NLP', 'Machine Learning'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
      features: ['Goal identification', 'Personalized coaching', 'Progress tracking', 'AI insights']
    },
    {
      title: 'MedSpa',
      description: 'AI-powered facial analysis application that helps users identify and understand their skin problems and conditions.',
      technologies: ['Python', 'Computer Vision', 'AI/ML', 'Image Processing'],
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56',
      features: ['Facial analysis', 'Skin condition detection', 'Treatment recommendations', 'Progress tracking']
    },
    {
      title: 'One Smile',
      description: 'Dental AI application that helps dentists replace damaged teeth with advanced imaging and treatment planning.',
      technologies: ['Python', 'Computer Vision', 'AI/ML', '3D Imaging'],
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09',
      features: ['Dental imaging', 'Treatment planning', '3D modeling', 'Patient consultation']
    },
    {
      title: 'Glimpsters',
      description: 'Privacy protection app that uses front camera to detect external cameras, unauthorized persons, and automatically blurs the screen.',
      technologies: ['Python', 'Computer Vision', 'AI/ML', 'Privacy Protection'],
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64',
      features: ['Camera detection', 'Privacy protection', 'Screen blurring', 'Real-time monitoring']
    }
  ];

  const certificates = [
    'Database Engineer', 'Data Science', 'Front-end Development', 'Python Bootcamp',
    'Introduction to AWS', 'APPIAN Low Code', 'Data Science Course'
  ];

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 dark:bg-black/10 border-b border-white/20 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="text-xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                Anurag Sharma
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'about', 'skills', 'projects', 'experience', 'education', 'certificates', 'contact'].map((item) => (
                <button
                  key={item}
                  className={`px-4 py-2 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium rounded-lg transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 ${activeSection === item ? 'text-primary-600 dark:text-primary-400' : ''}`}
                  onClick={() => scrollToSection(item)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-neutral-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-neutral-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10 dark:border-white/5">
              <div className="flex flex-col space-y-2">
                {['home', 'about', 'skills', 'projects', 'experience', 'education', 'certificates', 'contact'].map((item) => (
                  <button
                    key={item}
                    className={`px-4 py-2 text-left text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium rounded-lg transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 ${activeSection === item ? 'text-primary-600 dark:text-primary-400' : ''}`}
                    onClick={() => scrollToSection(item)}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900"></div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                Anurag Sharma
              </span>
            </h1>
            <div className="text-2xl sm:text-3xl font-semibold text-neutral-500 dark:text-neutral-400 mb-4">
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Full-Stack Developer & AI Engineer
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-neutral-600 dark:text-neutral-300 mb-6">
              Crafting Intelligent Solutions with Code & AI
            </h2>
            <p className="text-lg sm:text-xl text-neutral-500 dark:text-neutral-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Transforming Data into Insights | Python & Django Specialist | Building Scalable Solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-500/20"
                onClick={() => scrollToSection('projects')}
              >
                View My Work
              </button>
              <button 
                className="px-6 py-3 bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-500/20"
                onClick={() => scrollToSection('contact')}
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-light-surface dark:bg-dark-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                I'm a passionate Backend Developer at WebMobril Technologies with expertise in Python, Django, and AI/ML technologies. 
                I specialize in building scalable applications, designing robust RESTful APIs, and implementing cutting-edge AI solutions.
              </p>
              <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                With a strong foundation in data analysis and machine learning, I transform complex data into actionable insights. 
                My experience spans from developing AI-powered applications to optimizing database performance and cloud deployment.
              </p>
              
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">11+</div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">Major Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary-600 dark:text-secondary-400 mb-2">7+</div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">Certifications</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2">1+</div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">Years Experience</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                      <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">Python Development</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-secondary-500 rounded-full"></div>
                      <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">AI/ML Solutions</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-accent-500 rounded-full"></div>
                      <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">Database Design</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-primary-400 rounded-full"></div>
                      <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">Cloud Deployment</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-secondary-400 rounded-full"></div>
                      <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">API Development</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-accent-400 rounded-full"></div>
                      <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">Data Analysis</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                Skills & Expertise
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400 capitalize">
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-sm rounded-full border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-light-surface dark:bg-dark-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden group">
                <div className="relative h-48 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900">
                  <img
                    src={`${project.image}?w=600&h=300&fit=crop&crop=center`}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-neutral-800 dark:text-neutral-200">
                    {project.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                        <span className="text-sm text-neutral-500 dark:text-neutral-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                    Backend Developer
                  </h3>
                  <p className="text-lg text-primary-600 dark:text-primary-400">
                    WebMobril Technologies
                  </p>
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 md:mt-0">
                  2023 - Present
                </div>
              </div>
              <div className="space-y-4 text-neutral-600 dark:text-neutral-300">
                <p>• Developed and maintained scalable backend applications using Python, Django, and Django REST Framework</p>
                <p>• Implemented AI/ML solutions including computer vision, natural language processing, and machine learning models</p>
                <p>• Designed and optimized database schemas using PostgreSQL, MySQL, and SQLite</p>
                <p>• Deployed applications to cloud platforms using AWS, Docker, and CI/CD pipelines</p>
                <p>• Collaborated with cross-functional teams to deliver high-quality software solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-light-surface dark:bg-dark-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                Education
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                    Bachelor's in Computer Science
                  </h3>
                  <p className="text-lg text-primary-600 dark:text-primary-400">
                    G.L BAJAJ GROUP OF INSTITUTIONS, Mathura
                  </p>
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 md:mt-0">
                  2019 - 2023
                </div>
              </div>
              <p className="text-neutral-600 dark:text-neutral-300">
                Graduated with honors, specializing in software engineering and data science. 
                Completed coursework in algorithms, data structures, machine learning, and web development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                Certifications
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate, index) => (
              <div key={index} className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                  {certificate}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-light-surface dark:bg-dark-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6">
                    I'm always interested in new opportunities and exciting projects. 
                    Let's discuss how we can work together!
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">Email</p>
                      <p className="font-medium text-neutral-800 dark:text-neutral-200 truncate">nitish892383@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-accent-600 dark:text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">Phone</p>
                      <p className="font-medium text-neutral-800 dark:text-neutral-200">+91 7668154063</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-secondary-600 dark:text-secondary-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">Location</p>
                      <p className="font-medium text-neutral-800 dark:text-neutral-200">India</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4 pt-4">
                  <a 
                    href="https://www.linkedin.com/in/anurag-sharma-0091b419a/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors duration-200 group"
                    aria-label="LinkedIn Profile"
                  >
                    <svg className="w-5 h-5 text-neutral-600 dark:text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://github.com/MR-Xcloud" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors duration-200 group"
                    aria-label="GitHub Profile"
                  >
                    <svg className="w-5 h-5 text-neutral-600 dark:text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  {/* <a 
                    href="https://twitter.com/yourusername" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors duration-200 group"
                    aria-label="Twitter Profile"
                  > */}
                    {/* <svg className="w-5 h-5 text-neutral-600 dark:text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg> */}
                  {/* </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-neutral-400">
            
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
