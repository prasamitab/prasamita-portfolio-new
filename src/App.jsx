import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';



// --- Configuration (Centralized Content for Easy Updates) ---

const portfolioData = {

  name: "Prasamita Bangal",

  taglines: [

    "Exploring Intelligence — from Drones to Data. 🤖", 

    "Bridging AI, Web, and Cyber Worlds. 🌐",

    "Creative Technologist & Innovator. 🚀"

  ],

  shortBio: "I’m Prasamita, a 3rd-year Integrated M.Tech Computer Science student specializing in AI, NLP, and Cybersecurity.",

  

  bio: {

    paragraph1: "I'm a 3rd-year Integrated M.Tech CSE student passionate about learning, building, and combining creativity with technology. My work is balanced across **AI/ML (CSIR-IICT)**, **scalable web applications**, and **Cybersecurity research**. I believe in solving real-world problems through a blend of technical strength, innovation, and thoughtful design.",

    paragraph2: "My academic path is centered on cutting-edge **AI/ML applications**, with a strong emphasis on **security protocols** and **scalable web development**. I thrive on exploring the intersection of these fields, combining strong theoretical knowledge with practical, impactful execution in areas like **Flutter development** and **Gemini API integration**.",

  },

  academic: "Integrated B.Tech + M.Tech in Computer Science and Engineering, Mahindra University. Expected Graduation: 2028. CGPA: 8.6/10.0.",

  contact: {

    email: "prasamita.bangal.pb@gmail.com",

    linkedin: "https://linkedin.com/in/prasamita-bangal-3b1088215",

    github: "https://github.com/prasamitab"

  },

  techStack: [

    { name: 'Python', icon: 'M15 4c-1.3 0-2.3.9-2.3 2s1 2 2.3 2 2.3-.9 2.3-2-.9-2-2.3-2zM4 14.5a2.5 2.5 0 012.5-2.5h11a2.5 2.5 0 012.5 2.5v.5H4v-.5z' },

    { name: 'C', icon: 'M18 10h-6V8h6V6H8a2 2 0 00-2 2v6c0 1.1.9 2 2 2h8a2 2 0 002-2V10z' },

    { name: 'React', icon: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-15.5V12h8.49c-.61-4.04-4.14-7-8.49-7zM12 19.5V12H3.51c.61 4.04 4.14 7 8.49 7zM12 4.5V12h-8.49c.61-4.04 4.14-7 8.49 7z' },

    { name: 'Tailwind', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-15.5V12h8.49c-.61-4.04-4.14-7-8.49-7zM12 19.5V12H3.51c.61 4.04 4.14 7 8.49 7zM12 4.5V12h-8.49c.61-4.04 4.14-7 8.49 7z' },

    { name: 'Flask', icon: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-15.5V12h8.49c-.61-4.04-4.14-7-8.49-7zM12 19.5V12H3.51c.61 4.04 4.14 7 8.49 7zM12 4.5V12h-8.49c.61-4.04 4.14-7 8.49 7z' },

    { name: 'Scikit-learn', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-15.5V12h8.49c-.61-4.04-4.14-7-8.49-7zM12 19.5V12H3.51c.61 4.04 4.14 7 8.49 7zM12 4.5V12h-8.49c.61-4.04 4.14-7 8.49 7z' },

    { name: 'Git', icon: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-15.5V12h8.49c-.61-4.04-4.14-7-8.49-7zM12 19.5V12H3.51c.61 4.04 4.14 7 8.49 7zM12 4.5V12h-8.49c.61-4.04 4.14-7 8.49 7z' },

    { name: 'Figma', icon: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-15.5V12h8.49c-.61-4.04-4.14-7-8.49-7zM12 19.5V12H3.51c.61 4.04 4.14 7 8.49 7zM12 4.5V12h-8.49c.61-4.04 4.14-7 8.49 7z' },

  ],

  skills: [

    { category: '💻 AI / Machine Learning', icon: 'M18 8h-1V6a3 3 0 00-3-3H6a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3v-2M13 18v-4h2v4M10 18v-8h2v8M7 18v-6h2v6', items: ['Python', 'Scikit-learn', 'Regression', 'Classification', 'NLP', 'Gemini API', 'Computer Vision'] },

    { category: '🌐 Web Development', icon: 'M10 3L14 3L14 21L10 21ZM10 6L14 6L14 18L10 18ZM17 21L21 21L21 3L17 3Z', items: ['HTML', 'CSS', 'JS', 'React', 'Tailwind', 'Flask', 'jQuery', 'Full-Stack Concepts'] },

    { category: '🔐 Cybersecurity & Forensics', icon: 'M12 11V16M12 2L12 6M12 18L12 22M7 11H17M7 16H17M2 11H7M17 11H22M2 16H7M17 16H22M12 11L12 16M7 11H17M7 16H17', items: ['Network Basics', 'Drone Forensics', 'Investigation Tools', 'Risk Mitigation', 'Security Protocols'] },

    { category: '🎨 Design & Creative Tools', icon: 'M10 6L3 13V17H7L14 10', items: ['Figma', 'Canva', 'Photoshop Basics', 'Graphic Design', 'UI/UX Principles'] },

    { category: '🧠 Other Tools & Concepts', icon: 'M20 7H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 12H4V9h16v10zM18 6V4c0-1.1-.9-2-2-2H8c0 1.1-.9 2-2 2v2', items: ['Git', 'VS Code', 'MATLAB', 'DSA', 'OOP', 'Scientific Reporting'] }

  ],

  projects: [

    // AI/ML PROJECTS

    { 

        id: 5, 

        title: 'Hybrid Predictive Maintenance', 

        category: 'AI/ML & NLP', 

        tags: ['ML Modeling', 'Predictive Analysis', 'NASA CMAPSS'], 

        desc: "Designed an ML model for predictive maintenance of industrial equipment using NASA's CMAPSS dataset. Focused on early fault detection using hybrid ML models. This industry-relevant predictive analytics project uses NASA data for early fault detection, focusing on hybrid model comparison and real-world reliability applications.", 

        techNote: 'Python | Pandas | Scikit-learn', 

        iconPath: 'M19 14V8H5v6M19 8V2H5v6M12 11V16M12 2L12 6M12 18L12 22', 

        githubUrl: '#', demoUrl: null, paperUrl: null 

    },

    { 

        id: 11, 

        title: 'Yoga Pose Search - Google AI Project', 

        category: 'AI/ML & NLP', 

        tags: ['Computer Vision', 'OpenCV', 'AI Tools'], 

        desc: "Built a pose-recognition prototype that detects and identifies yoga postures using AI. Utilized computer vision and pose estimation techniques, showcasing the blend of AI and computer vision for interactive applications.", 

        techNote: 'Python | OpenCV | Google AI Tools', 

        iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z', 

        githubUrl: '#', demoUrl: null, paperUrl: null 

    },

    { id: 1, title: 'Project Chronos - AI Slang Analyzer', category: 'AI/ML & NLP', tags: ['Gemini API', 'Streamlit', 'NLP'], desc: 'AI-driven web app decoding internet slang using the Gemini and Custom Search APIs for contextual analysis. Showcases complex API chaining.', techNote: 'Python | Gemini API | Streamlit', iconPath: 'M12 2L2 12h3c0 3 2 5 5 5s5-2 5-5h3L12 2z', githubUrl: '#', demoUrl: '#' },

    { id: 2, title: 'DroneTalk - Command System', category: 'AI/ML & NLP', tags: ['Python', 'NLP', 'Intent Classification'], desc: 'NLP system converting natural language commands ("Fly 50m north") into structured drone mission actions. High accuracy in intent classification.', techNote: 'Python | NLP', iconPath: 'M16 17V19H8V17H4V12H2L12 2L22 12H20V17H16Z', githubUrl: '#', demoUrl: '#' },

    

    // CYBERSECURITY PROJECTS

    { id: 9, title: 'AI-Driven Intrusion Detection System (IDS)', category: 'Cybersecurity & Forensics', tags: ['Python', 'Scikit-learn', 'Published Research'], desc: 'Designed an AI-powered network intrusion detection system that identifies and classifies cyber threats in real time. Utilized the NSL-KDD dataset to train ML models like Random Forest, SVM, and KNN to detect malicious traffic patterns. Focused on reducing false positives and improving threat classification accuracy using data preprocessing and feature selection. Implemented data visualization and comparative performance analysis for multiple classifiers. Published the research paper at the Jadavpur University Symposium (2024) following peer review and presentation.', techNote: 'Python | Scikit-learn | Pandas | Matplotlib', iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z', githubUrl: '#', demoUrl: null, paperUrl: '#' },

    { id: 4, title: 'Drone Forensics Research (Ongoing)', category: 'Cybersecurity & Forensics', tags: ['Forensics', 'Data Analysis', 'Research'], desc: 'Exploratory research focused on the recovery and analysis of digital evidence from Unmanned Aerial Systems (UAS) for security applications. Currently drafting a research paper.', techNote: 'Python | Forensics Tools', iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z', githubUrl: '#', demoUrl: null, paperUrl: '#' },

    { id: 10, title: 'Behavioral Data Analysis for Digital Wellbeing', category: 'Cybersecurity & Forensics', tags: ['Pandas', 'Visualization', 'Digital Safety'], desc: 'Reframed project analyzing behavioral data and online habits to raise awareness of digital safety patterns and screen-time effects. Utilizes Python and Web Visualization.', techNote: 'Python | Pandas | Matplotlib | Web Viz', iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z', githubUrl: '#', demoUrl: null },

    

    // WEB DEVELOPMENT PROJECTS

    { id: 3, title: 'Smart Medicine Return Platform', category: 'Web Development', tags: ['Flutter', 'Full-Stack', 'Cloud'], desc: 'Cross-platform Flutter application for medicine disposal and supply chain visibility using real-time cloud services (IoT concepts applied).', techNote: 'Flutter | Firebase | Full-Stack', iconPath: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6L12 13 2 6', githubUrl: '#', demoUrl: '#' },

    { id: 6, title: 'Student Grade Management System', category: 'Web Development', tags: ['Flask', 'Python', 'Server-Side'], desc: 'Web server built with Flask to handle secure CRUD operations and data management for student grades in CSV format.', techNote: 'Flask | Python | CSV', iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z', githubUrl: '#', demoUrl: '#' },

    { id: 8, title: 'Library Management System', category: 'Web Development', tags: ['HTML/CSS/JS', 'CRUD'], desc: 'Full-featured web application created to manage book inventory, users, and borrowing operations demonstrating core web logic.', techNote: 'HTML | CSS | JavaScript', iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z', githubUrl: '#', demoUrl: '#' },

  ],

  experience: [

    { role: 'AI/ML Intern', company: 'CSIR-IICT (Biotech Sector)', desc: 'Applied machine learning techniques to real-world healthcare and biotech data, gaining practical ML deployment experience.' },

    { role: 'Member', company: 'Student Council, Mahindra University', desc: 'Contributed to university governance, policy discussions, and the planning/execution of major campus initiatives.' },

    { role: 'Design Team Member', company: 'Arts Club', desc: 'Managed visual identity for 5+ major events, designing promotional materials (posters, logos) that drove engagement.' },

    { role: 'Secretary', company: 'Swimming Club', desc: 'Streamlined club communications and managed logistics for training, competitions, and official meetings.' },

  ],

  achievements: [

    "AIRO Swimming Relay - 2nd Prize.",

    "Winner - Inter DPS Swimming Competition.",

    "2nd Prize (₹2000) - Shadow Strikers Team Competition.",

    "Qublitz Hackathon - Built a working prototype under time pressure.",

    "Web Development Course - Corizo Certification.",

    "Math Olympiad - 7th Rank (Round 1), 2018.",

    "Merit Project recognition at Arduino Workshop (IoT/Embedded Systems)."

  ],

  extracurricular: [

    "Graduate in Sketching & Painting - GlobalArts.",

    "Graduate in Abacus - SIP Academy.",

    "Winner - South Level Singing Competition.",

    "Painting & Selling Artwork (Canvas & Pencil Drawings)",

    "Swimming, Dancing, Travelling (Active participation)",

    "Environmental Tech Innovation (Focused interest area)",

    "Performing Arts (Etincelle, Flashmobs, Dance Competitions)"

  ],

  cyberEngagements: [

    { title: 'Hack The Box', desc: 'Active Member — Regularly solving cybersecurity challenges, practicing ethical hacking labs, and improving penetration testing skills.', iconPath: 'M12 1L2 12h3c0 3 2 5 5 5s5-2 5-5h3L12 1z' }

  ],

  milestones: [

    { year: '2028', title: 'Expected Graduation (Integrated M.Tech CSE)', desc: 'Finalizing research in AI/Cybersecurity and transitioning to full-time roles.' },

    { year: '2024', title: 'AI/ML Internship at CSIR-IICT', desc: 'Applied machine learning models to real-world healthcare and biotech data, gaining practical ML deployment experience.' },

    { year: '2023', title: 'Deepened Web Stack & AI Projects', desc: 'Focused on building full-stack applications (Flask/Flutter) and cutting-edge Gemini API projects (Project Chronos).' },

    { year: '2022', title: 'Integrated M.Tech Enrollment & Core Tech Focus', desc: 'Began integrated program, focusing on core DSA, Python, and initial AI/ML concepts.' },

  ],

};



// --- Utility Components ---



const Icon = ({ path, className = "w-6 h-6", stroke = 2 }) => (

  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">

    <path d={path} />

  </svg>

);



// --- Typing Animation Hook ---

const useTypingEffect = (texts, speed = 100, delay = 2000) => {

  const [currentText, setCurrentText] = useState('');

  const [isDeleting, setIsDeleting] = useState(false);

  const [loopNum, setLoopNum] = useState(0);

  const [typingSpeed, setTypingSpeed] = useState(speed);



  useEffect(() => {

    let timer = setTimeout(() => {

      const i = loopNum % texts.length;

      const fullText = texts[i];



      if (isDeleting) {

        setCurrentText(fullText.substring(0, currentText.length - 1));

        setTypingSpeed(speed / 3);

      } else {

        setCurrentText(fullText.substring(0, currentText.length + 1));

        setTypingSpeed(speed);

      }



      if (!isDeleting && currentText === fullText) {

        setTimeout(() => setIsDeleting(true), delay);

      } else if (isDeleting && currentText === '') {

        setIsDeleting(false);

        setLoopNum(loopNum + 1);

        setTypingSpeed(speed);

      }

    }, typingSpeed);



    return () => clearTimeout(timer);

  }, [currentText, isDeleting, loopNum, typingSpeed, texts, speed, delay]);



  return currentText;

};



// --- Framer Motion Simulation (Scroll-triggered Animation) ---

const useScrollAnimation = (threshold = 0.1) => {

    const ref = useRef(null);

    const [isVisible, setIsVisible] = useState(false);



    useEffect(() => {

        const observer = new IntersectionObserver(

            ([entry]) => {

                if (entry.isIntersecting) {

                    setIsVisible(true);

                    observer.unobserve(entry.target);

                }

            },

            { threshold }

        );



        if (ref.current) {

            observer.observe(ref.current);

        }



        return () => {

            if (ref.current) {

                observer.unobserve(ref.current);

            }

        };

    }, [ref, threshold]);



    return [ref, isVisible];

};



// --- New Timeline Component ---

const MilestoneTimeline = ({ milestones }) => {

    return (

        <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700">

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 border-b pb-2 border-indigo-200 dark:border-teal-700">Academic & Learning Timeline</h3>

            <div className="relative pl-6 border-l-4 border-indigo-200 dark:border-teal-700">

                {(milestones || []).map((milestone, index) => {

                    const [ref, isVisible] = useScrollAnimation(0.2);

                    const animationClass = isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-20px]';

                    return (

                        <div key={index} ref={ref} className={`mb-8 transition duration-700 ease-out ${animationClass}`}>

                            <div className="absolute w-4 h-4 rounded-full -left-2 mt-1.5 bg-indigo-600 dark:bg-teal-400 border-4 border-white dark:border-gray-800 shadow-md"></div>

                            <p className="text-xs uppercase font-bold text-indigo-600 dark:text-teal-400 tracking-wider">{milestone.year}</p>

                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">{milestone.title}</h4>

                            <p className="text-sm text-gray-700 dark:text-gray-300 italic">{milestone.desc}</p>

                        </div>

                    );

                })}

            </div>

        </div>

    );

};



// --- Project Detail Modal ---



const ProjectDetailModal = ({ project, onClose, getCategoryColor }) => {

    if (!project) return null;



    const colors = getCategoryColor(project.category);

    

    // Ensure all links are accessible, use '#' as a fallback

    const githubLink = project.githubUrl && project.githubUrl !== '#' ? project.githubUrl : null;

    const demoLink = project.demoUrl && project.demoUrl !== '#' ? project.demoUrl : null;

    const paperLink = project.paperUrl && project.paperUrl !== '#' ? project.paperUrl : null;

    

    const LinkIcon = 'M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71';

    const GitHubIcon = 'M15 22.1C10.7 22.1 7 19.3 7 15.3c0-3.3 2.1-5.7 5.1-6.5l.7-.2c.7-.2 1.5-.4 2.3-.6l-.7-.2c-3.1-.9-5.3-3.9-5.3-7.1 0-3.9 3.4-7 7.7-7 4.3 0 7.7 3.1 7.7 7.1 0 3.2-2.2 6.2-5.3 7.1l-.7.2c.8.2 1.6.4 2.3.6l-.7.2c3.1.8 5.1 3.2 5.1 6.5 0 4-3.7 6.8-7.9 6.8z';

    const PaperIcon = 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6';



    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-75 backdrop-blur-sm transition-opacity duration-300" onClick={onClose}>

            <div className="bg-white dark:bg-gray-800 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl transform transition-transform duration-300 scale-100" onClick={e => e.stopPropagation()}>

                <div className="sticky top-0 p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex justify-between items-center z-10">

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{project.title}</h2>

                    <button onClick={onClose} className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition duration-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">

                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>

                    </button>

                </div>



                <div className="p-6">

                    <p className={`text-sm font-medium uppercase mb-3 ${colors.text}`}>{project.category}</p>

                    

                    <div className="mb-6">

                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Technical Summary</h3>

                        <p className="text-md text-gray-700 dark:text-gray-300">Stack: <span className="font-medium text-indigo-700 dark:text-teal-300">{project.techNote}</span></p>

                        <div className="flex flex-wrap mt-3">

                            {(project.tags || []).map(tag => (

                                <span key={tag} className={`px-3 py-1 ${colors.bg} text-indigo-800 dark:text-teal-300 text-xs rounded-full mr-2 mb-2`}>

                                    {tag}

                                </span>

                            ))}

                        </div>

                    </div>



                    <div className="mb-6">

                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Full Description</h3>

                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{project.desc}</p>

                    </div>



                    <div className="flex space-x-4 border-t pt-4 border-gray-200 dark:border-gray-700">

                        {githubLink && (

                            <a href={githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-200">

                                <Icon path={GitHubIcon} className="w-5 h-5 mr-2" stroke={2} />

                                View on GitHub

                            </a>

                        )}

                        {demoLink && (

                            <a href={demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200">

                                <Icon path={LinkIcon} className="w-5 h-5 mr-2" stroke={2} />

                                View Live Demo

                            </a>

                        )}

                        {paperLink && (

                            <a href={paperLink} target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200">

                                <Icon path={PaperIcon} className="w-5 h-5 mr-2" stroke={2} />

                                View Research Paper

                            </a>

                        )}

                    </div>



                </div>

            </div>

        </div>

    );

};



// --- Layout Components ---



const Header = ({ darkMode, toggleDarkMode }) => {

  const scrollToSection = (id) => {

    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  };



  const navItems = [

    { label: 'About', id: 'about' },

    { label: 'Skills', id: 'skills' },

    { label: 'Projects', id: 'projects' },

    { label: 'Achievements', id: 'achievements' },

    { label: 'Contact', id: 'contact' },

  ];



  const SunIcon = 'M12 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm6.5 6.5a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM4.8 17.2a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zm0-9.4a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM12 21a1 1 0 01-1 1H10a1 1 0 010-2h1a1 1 0 011 1zm7.8-3.4a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM3 13a1 1 0 010-2H2a1 1 0 010 2h1zm19 0a1 1 0 010-2h-1a1 1 0 010 2h1z';

  const MoonIcon = 'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z';



  return (

    <nav className="fixed w-full z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md transition duration-300">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16">

          <div className="text-2xl font-bold text-indigo-600 dark:text-teal-400 cursor-pointer" onClick={() => scrollToSection('home')}>

            P. Bangal

          </div>

          <div className="flex items-center space-x-4">

            {navItems.map(item => (

              <button

                key={item.id}

                onClick={() => scrollToSection(item.id)}

                className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-teal-400 transition duration-150 font-medium hidden sm:inline-block"

              >

                {item.label}

              </button>

            ))}

            <button

              onClick={toggleDarkMode}

              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150"

              aria-label="Toggle Dark Mode"

            >

              <Icon path={darkMode ? MoonIcon : SunIcon} className="w-5 h-5" />

            </button>

          </div>

        </div>

      </div>

    </nav>

  );

};



const Hero = ({ setActiveCategory }) => {

  const typedText = useTypingEffect(portfolioData.taglines);

  const [nameAnimated, setNameAnimated] = useState(false);

  

  useEffect(() => {

    setNameAnimated(true);

  }, []);

  

  const nameAnimationClass = nameAnimated ? 'animate-pop-up-name' : 'opacity-0 translate-y-10';



  // Featured Projects for the Hero Section (IDS, Chronos, DroneTalk, DroneForensics)

  const featured = portfolioData.projects.filter(p => [9, 1, 2, 4].includes(p.id)).slice(0, 4);



  const getCategoryColor = useCallback((category) => {

    if (category.includes('AI')) return 'bg-indigo-600';

    if (category.includes('Web')) return 'bg-teal-600';

    if (category.includes('Cybersecurity')) return 'bg-red-600';

    return 'bg-purple-600';

  }, []);

  

  const handleHeroFilterClick = (category) => {

    // 1. Scroll to the projects section

    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });

    // 2. Set the category filter in the Projects component state

    setActiveCategory(category);

  };





  return (

    <section id="home" className="pt-36 pb-20 bg-gray-50 dark:bg-gray-900 transition duration-500 min-h-screen flex flex-col justify-center">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center">

            

            {/* Name and Animation */}

            <h1 className={`text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight ${nameAnimationClass}`}>

                Hi, I’m <span className="text-indigo-600 dark:text-teal-400">{portfolioData.name}</span> 👋

            </h1>

            

            {/* Title / Short Bio */}

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 font-medium mb-4 max-w-2xl mx-auto">

                {portfolioData.shortBio}

            </p>

            

            {/* Dynamic Typing */}

            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 font-light mb-8 h-8 md:h-9">

                <span className="font-semibold">{typedText}</span>

                <span className="inline-block w-0.5 h-6 ml-1 bg-indigo-600 dark:bg-teal-400 align-middle animate-pulse"></span>

            </p>

            

            {/* Buttons */}

            <div className="space-x-4 mb-16">

                <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition duration-300">

                    View My Work

                </button>

                <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 bg-white dark:bg-gray-800 text-indigo-600 dark:text-teal-400 border border-indigo-600 dark:border-teal-400 font-semibold rounded-full shadow-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition duration-300">

                    Contact Me

                </button>

            </div>

        </div>



        {/* Featured Projects Showcase */}

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center border-t pt-8">Featured Projects</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {(featured || []).map(p => (

                <div key={p.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border-t-4 border-indigo-400 dark:border-teal-400 transform hover:shadow-xl transition duration-300">

                    <span className={`text-xs text-white font-bold px-2 py-0.5 rounded-full ${getCategoryColor(p.category)} mb-2 inline-block`}>{p.category.split(' & ')[0]}</span>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{p.title}</h3>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{p.desc.substring(0, 70)}...</p>

                </div>

            ))}

        </div>

        

        {/* Explore Work Section (UPDATED) */}

        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">

            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Explore My Work</h3>

            <div className="flex flex-wrap justify-center space-x-4">

                <button 

                    onClick={() => handleHeroFilterClick('AI/ML & NLP')} 

                    className="px-4 py-2 text-sm bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition"

                >

                    🔹 AI / ML Projects

                </button>

                <button 

                    onClick={() => handleHeroFilterClick('Web Development')} 

                    className="px-4 py-2 text-sm bg-teal-500 text-white rounded-full hover:bg-teal-600 transition"

                >

                    🔹 Web Development

                </button>

                <button 

                    onClick={() => handleHeroFilterClick('Cybersecurity & Forensics')} 

                    className="px-4 py-2 text-sm bg-red-500 text-white rounded-full hover:bg-red-600 transition"

                >

                    🔹 Cybersecurity

                </button>

            </div>

        </div>



      </div>

    </section>

  );

};



const About = () => {

    const [ref, isVisible] = useScrollAnimation(0.2);

    const animationClass = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10';



    const academicParts = (portfolioData.academic || '').split('. ');

    const degreeInfo = academicParts[0];

    const graduationInfo = academicParts[1];

    const cgpaInfo = academicParts.find(part => part.includes('CGPA'));

    

    // Fallback for bio paragraphs

    const bioParagraph1 = portfolioData.bio?.paragraph1 || "Bio content coming soon...";

    const bioParagraph2 = portfolioData.bio?.paragraph2 || "Technical details will be added here.";





    return (

        <section id="about" className="py-24 bg-white dark:bg-gray-800 transition duration-500">

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-16 text-center">

                    About Me

                </h2>

                

                <div ref={ref} className={`grid md:grid-cols-2 gap-12 transition duration-700 ease-out ${animationClass}`}>

                    

                    {/* Bio & Academic Text Blocks (Left Column) */}

                    <div className="text-lg text-gray-700 dark:text-gray-300 space-y-6">

                        

                        {/* Paragraph 1 - Passion & Balance (New, Clean Look) */}

                        <div className="p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-700/70">

                            <p className="font-semibold text-gray-800 dark:text-gray-200">

                                {/* Use dangerouslySetInnerHTML to allow **bold** formatting in the string without major complex parsing logic */}

                                <span dangerouslySetInnerHTML={{ __html: bioParagraph1.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

                            </p>

                        </div>



                        {/* Paragraph 2 - Technical Focus & Execution */}

                        <div className="p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-700/70">

                            <p className="text-gray-800 dark:text-gray-200">

                                <span dangerouslySetInnerHTML={{ __html: bioParagraph2.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

                            </p>

                        </div>

                        

                        {/* Academic Summary - CGPA ADDED */}

                        <div className="p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-700/70 border-l-4 border-teal-400">

                            <h3 className="text-xl font-semibold text-indigo-600 dark:text-teal-400 mb-2">

                                Academic Background

                            </h3>

                            <p className="text-gray-800 dark:text-gray-200 font-medium">{degreeInfo}</p>

                            <p className="text-gray-600 dark:text-gray-400">{graduationInfo} | <strong className="text-indigo-700 dark:text-teal-300">{cgpaInfo}</strong></p>

                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">

                                Focus: DSA | Algorithms | AI Fundamentals | Cybersecurity

                            </p>

                        </div>

                    </div>

                    

                    {/* Tech Stack Grid & Timeline (Right Column) */}

                    <div>

                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Core Tech Stack</h3>

                        <div className="grid grid-cols-4 sm:grid-cols-4 gap-4">

                            {(portfolioData.techStack || []).map(tech => (

                                <div key={tech.name} className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-md transform hover:scale-105 transition duration-200 hover:shadow-lg">

                                    <Icon path={tech.icon} className="w-8 h-8 text-indigo-600 dark:text-teal-400 mb-1" stroke={1.5}/>

                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">{tech.name.split(' ')[0]}</span>

                                </div>

                            ))}

                        </div>

                        

                        {/* Timeline Component Insertion */}

                        <MilestoneTimeline milestones={portfolioData.milestones || []} />

                    </div>

                </div>

            </div>

        </section>

    );

};



const Skills = () => {

  const [ref, isVisible] = useScrollAnimation(0.1);

  const animationClass = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10';



  return (

    <section id="skills" className="py-24 bg-gray-50 dark:bg-gray-900 transition duration-500">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-16 text-center">

          Technical Toolkit & Skillset

        </h2>

        <div ref={ref} className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition duration-700 ease-out ${animationClass}`}>

          {(portfolioData.skills || []).map((skillGroup, index) => (

            <div key={skillGroup.category} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl border-t-4 border-indigo-400 dark:border-teal-400 transform hover:shadow-2xl transition duration-300">

              <div className="flex items-center mb-4">

                <Icon path={skillGroup.icon} className="w-8 h-8 text-indigo-600 dark:text-teal-400 mr-3" stroke={1.5} />

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{skillGroup.category}</h3>

              </div>

              <div className="flex flex-wrap">

                {(skillGroup.items || []).map((item) => (

                  <span key={item} className="px-3 py-1 bg-indigo-100 dark:bg-gray-700 text-indigo-700 dark:text-teal-400 text-sm font-medium rounded-full mr-2 mb-2 transition duration-150 hover:bg-indigo-200 dark:hover:bg-gray-600">

                    {item}

                  </span>

                ))}

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

};



const Projects = ({ activeCategory, setActiveCategory }) => {

  const projectsArray = portfolioData.projects || [];

  const [selectedProject, setSelectedProject] = useState(null);

  

  // Use the prop activeCategory instead of internal state for initial filtering

  const [localActiveCategory, setLocalActiveCategory] = useState(activeCategory);



  // Sync internal state with prop changes (e.g., when clicking a button in Hero)

  useEffect(() => {

      setLocalActiveCategory(activeCategory);

  }, [activeCategory]);

  

  const allCategories = useMemo(() => {

    const categories = new Set(projectsArray.map(p => p.category));

    return ['All', ...Array.from(categories)];

  }, [projectsArray]);



  const [ref, isVisible] = useScrollAnimation(0.1);



  const filteredProjects = useMemo(() => {

    if (localActiveCategory === 'All') {

      return projectsArray;

    }

    return projectsArray.filter(p => p.category === localActiveCategory);

  }, [localActiveCategory, projectsArray]);

  

  // Handle filter changes from this component

  const handleFilterChange = (category) => {

      setLocalActiveCategory(category);

      setActiveCategory(category); // Also update the global state in App

  };

  

  const getCategoryColor = useCallback((category) => {

    if (category.includes('AI')) return { text: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-200 dark:bg-indigo-700', border: 'border-indigo-600 dark:border-indigo-400' };

    if (category.includes('Web')) return { text: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-200 dark:bg-teal-700', border: 'border-teal-600 dark:border-teal-400' };

    if (category.includes('Cybersecurity')) return { text: 'text-red-600 dark:text-red-400', bg: 'bg-red-200 dark:bg-red-700', border: 'border-red-600 dark:border-red-400' };

    if (category.includes('Research')) return { text: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-200 dark:bg-purple-700', border: 'border-purple-600 dark:border-purple-400' };

    return { text: 'text-gray-600 dark:text-gray-400', bg: 'bg-gray-200 dark:bg-gray-700', border: 'border-gray-600 dark:border-gray-400' };

  }, []);



  const openModal = (project) => {

    setSelectedProject(project);

  };



  const closeModal = () => {

    setSelectedProject(null);

  };

  

  const LinkIcon = 'M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71';



  return (

    <section id="projects" className="py-24 bg-white dark:bg-gray-800 transition duration-500">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-10 text-center">

          Projects Showcase

        </h2>



        {/* Filter Bar */}

        <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mb-12">

          {allCategories.map(category => (

            <button

              key={category}

              onClick={() => handleFilterChange(category)}

              className={`px-5 py-2 text-sm sm:text-base font-semibold rounded-full transition duration-300 mb-2

                ${localActiveCategory === category

                  ? 'bg-indigo-600 text-white shadow-md'

                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-600'

                }`}

            >

              {category}

            </button>

          ))}

        </div>



        {/* Project Grid */}

        <div ref={ref} className={`grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 transition duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          {(filteredProjects || []).map(project => {

            const colors = getCategoryColor(project.category);

            return (

              <div 

                key={project.id} 

                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-lg border-t-4 border-b-4 border-transparent hover:border-indigo-400 dark:hover:border-teal-400 transform hover:translate-y-[-4px] transition duration-300 group hover:shadow-2xl cursor-pointer"

                onClick={() => openModal(project)}

              >

                

                {/* Thumbnail/Logo Placeholder & Title */}

                <div className="flex items-start mb-4 border-b pb-2 border-gray-200 dark:border-gray-600">

                    <Icon path={project.iconPath || 'M12 2L2 12h20z'} className={`w-8 h-8 mr-3 ${colors.text}`} stroke={1.5} />

                    <div>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{project.title}</h3>

                        <p className={`text-xs font-medium ${colors.text}`}>{project.category}</p>

                    </div>

                </div>



                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">{project.desc.substring(0, 100)}...</p>

                

                {/* Tech Stack Note */}

                <p className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3">

                    Stack: <span className="font-normal text-indigo-700 dark:text-teal-300">{project.techNote}</span>

                </p>



                <div className="flex flex-wrap mb-4">

                  {(project.tags || []).map(tag => (

                    <span key={tag} className={`px-3 py-1 ${colors.bg} text-indigo-800 dark:text-teal-300 text-xs rounded-full mr-2 mb-2`}>

                      {tag}

                    </span>

                  ))}

                </div>

                

                {/* View Details Button */}

                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">

                    <button className="text-sm font-semibold text-indigo-600 dark:text-teal-400 hover:underline flex items-center">

                        <Icon path={LinkIcon} className="w-4 h-4 mr-1 transform rotate-45" stroke={2} />

                        View Details

                    </button>

                </div>

              </div>

            );

          })}

        </div>



        {/* Cybersecurity Engagements Section (NEW) */}

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-16 mb-6 text-center">Cybersecurity Engagements</h3>

        <div className="flex justify-center flex-wrap gap-6">

            {(portfolioData.cyberEngagements || []).map((engagement, index) => (

                <div key={index} className="w-full md:w-96 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-l-4 border-red-500 hover:shadow-2xl transition duration-300">

                    <div className="flex items-center mb-3">

                        <Icon path={engagement.iconPath || 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z'} className="w-6 h-6 text-red-600 dark:text-red-400 mr-3" />

                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{engagement.title}</h4>

                    </div>

                    <p className="text-gray-700 dark:text-gray-300 text-sm">{engagement.desc}</p>

                </div>

            ))}

        </div>

      </div>

      

      {/* MODAL INSERTION */}

      {selectedProject && (

          <ProjectDetailModal 

            project={selectedProject} 

            onClose={closeModal} 

            getCategoryColor={getCategoryColor}

          />

      )}

    </section>

  );

};



const Achievements = () => {

  const [ref, isVisible] = useScrollAnimation(0.1);

  const animationClass = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10';

  const TrophyIcon = 'M12 17.5L14.73 20L19 16M17 19H7C5.34 19 4 17.66 4 16V6C4 4.34 5.34 3 7 3H17C18.66 3 20 4.34 20 6V16C20 17.66 18.66 19 17 19Z';

  const StarIcon = 'M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z';

  const BriefcaseIcon = 'M16 4h-4c-1.1 0-2 .9-2 2v2H8V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-2zM4 6h2v2H4V6zm14 12H6V10h12v8z';



  return (

    <section id="achievements" className="py-24 bg-gray-50 dark:bg-gray-900 transition duration-500">

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">

          Achievements & Recognitions

        </h2>

        <ul ref={ref} className={`space-y-8 transition duration-700 ease-out ${animationClass}`}>

          

          {/* Experience & Leadership Section */}

          <li className="p-6 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-xl">

            <h3 className="text-2xl font-bold text-indigo-600 dark:text-teal-400 mb-4 flex items-center">

              <Icon path={BriefcaseIcon} className="w-7 h-7 mr-3" stroke={2} />

              Experience & Leadership

            </h3>

            <div className="space-y-4">

              {(portfolioData.experience || []).map((exp, index) => (

                <div key={index} className="border-l-4 border-indigo-200 dark:border-teal-700 pl-4">

                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{exp.role} @ {exp.company}</p>

                  <p className="text-gray-700 dark:text-gray-300 text-md">{exp.desc}</p>

                </div>

              ))}

            </div>

          </li>

          

          {/* Core Achievements */}

          {(portfolioData.achievements || []).map((item, index) => (

            <li key={index} className="flex items-start bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg border-l-4 border-teal-400 hover:shadow-xl transition duration-300">

              <Icon path={TrophyIcon} className="w-6 h-6 text-teal-500 dark:text-teal-400 mr-4 mt-1 flex-shrink-0" />

              <p className="text-gray-700 dark:text-gray-300 text-lg">{item}</p>

            </li>

          ))}

          

          {/* Extracurricular & Interests Section */}

          <li className="p-6 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">

            <h3 className="text-xl font-bold text-indigo-600 dark:text-teal-400 mb-3 flex items-center">

              <Icon path={StarIcon} className="w-6 h-6 mr-2" stroke={2} />

              Extracurricular & Creative Interests

            </h3>

            <div className="flex flex-wrap -m-1">

              {(portfolioData.extracurricular || []).map((item, index) => (

                <span key={index} className="m-1 px-4 py-1.5 bg-indigo-200 dark:bg-gray-600 text-indigo-800 dark:text-teal-300 text-sm font-medium rounded-full">

                  {item}

                </span>

              ))}

            </div>

          </li>

        </ul>

        

        {/* Resume Button */}

        <div className="text-center mt-12">

          <button className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition duration-300">

            Download Resume (PDF)

          </button>

        </div>

      </div>

    </section>

  );

};



const Contact = () => {

  const MailIcon = 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6L12 13 2 6';

  const LinkedinIcon = 'M16 8a6 6 0 00-6-6A6 6 0 004 8v16h6V12h4v12h6V8z';

  const GithubIcon = 'M15 22.1C10.7 22.1 7 19.3 7 15.3c0-3.3 2.1-5.7 5.1-6.5l.7-.2c.7-.2 1.5-.4 2.3-.6l-.7-.2c-3.1-.9-5.3-3.9-5.3-7.1 0-3.9 3.4-7 7.7-7 4.3 0 7.7 3.1 7.7 7.1 0 3.2-2.2 6.2-5.3 7.1l-.7.2c.8.2 1.6.4 2.3.6l-.7.2c3.1.8 5.1 3.2 5.1 6.5 0 4-3.7 6.8-7.9 6.8z';

  const [ref, isVisible] = useScrollAnimation(0.1);

  const animationClass = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10';





  return (

    <section id="contact" className="py-24 bg-white dark:bg-gray-800 transition duration-500">

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">

          Let's Connect

        </h2>

        

        {/* Contact Info Grid */}

        <div ref={ref} className={`grid md:grid-cols-3 gap-8 mb-12 text-center transition duration-700 ease-out ${animationClass}`}>

          <a href={`mailto:${portfolioData.contact.email}`} className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100 dark:border-gray-600">

            <Icon path={MailIcon} className="w-8 h-8 text-indigo-600 dark:text-teal-400 mb-2" />

            <span className="text-gray-700 dark:text-gray-300 font-medium break-all">{portfolioData.contact.email}</span>

          </a>

          <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100 dark:border-gray-600">

            <Icon path={LinkedinIcon} className="w-8 h-8 text-indigo-600 dark:text-teal-400 mb-2" />

            <span className="text-gray-700 dark:text-gray-300 font-medium">LinkedIn</span>

          </a>

          <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100 dark:border-gray-600">

            <Icon path={GithubIcon} className="w-8 h-8 text-indigo-600 dark:text-teal-400 mb-2" />

            <span className="text-gray-700 dark:text-gray-300 font-medium">GitHub</span>

          </a>

        </div>



        {/* Contact Form Placeholder */}

        <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl shadow-2xl">

          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Send a Message</h3>

          <p className="text-gray-600 dark:text-gray-400 mb-6">Note: This form is a placeholder. Please use the direct email link above for reliable contact.</p>

          <form onSubmit={(e) => { e.preventDefault(); alert("Form submitted! (Placeholder action)"); }}>

            <input type="text" placeholder="Your Name" required className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition duration-150" />

            <input type="email" placeholder="Your Email" required className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition duration-150" />

            <textarea placeholder="Your Message" rows="4" required className="w-full p-3 mb-6 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"></textarea>

            <button type="submit" className="w-full px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300">

              Send Message

            </button>

          </form>

        </div>

      </div>

    </section>

  );

};



// --- Main App Component ---



const App = () => {

  const [darkMode, setDarkMode] = useState(false);

  const [activeCategory, setActiveCategory] = useState('All'); // State for project filtering



  useEffect(() => {

    const storedPreference = localStorage.getItem('theme');

    if (storedPreference === 'dark' || (!storedPreference && window.matchMedia('(prefers-color-scheme: dark)').matches)) {

      setDarkMode(true);

    }

  }, []);



  const toggleDarkMode = useCallback(() => {

    setDarkMode(prev => {

        const newMode = !prev;

        localStorage.setItem('theme', newMode ? 'dark' : 'light');

        return newMode;

    });

  }, []);



  useEffect(() => {

    if (darkMode) {

      document.documentElement.classList.add('dark');

    } else {

      document.documentElement.classList.remove('dark');

    }

  }, [darkMode]);



  return (

    <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-white dark:bg-gray-900`}>

      {/* GLOBAL CSS STYLES FOR ANIMATION */}

      <style>

        {`

        @keyframes popUpName {

            0% {

                opacity: 0;

                transform: translateY(20px) scale(0.9);

            }

            70% {

                opacity: 0.8;

                transform: translateY(-5px) scale(1.05);

            }

            100% {

                opacity: 1;

                transform: translateY(0) scale(1);

            }

        }

        .animate-pop-up-name {

            animation: popUpName 0.8s ease-out forwards;

        }

        `}

      </style>



      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="pt-16">

        <Hero setActiveCategory={setActiveCategory} />

        <About />

        <Skills />

        <Projects activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

        <Achievements />

        <Contact />

      </main>

      <footer className="py-8 text-center text-gray-500 dark:text-gray-400 text-sm border-t border-gray-100 dark:border-gray-700">

        &copy; {new Date().getFullYear()} Prasamita Bangal. Built with React & Tailwind.

      </footer>

    </div>

  );

};



export default App;