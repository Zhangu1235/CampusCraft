export const initialCurrentUser = {
  id: "student-1",
  name: "Arjun Mehta",
  email: "arjun.m@iitb.ac.in",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
  title: "Full-Stack Developer & UI/UX Specialist",
  college: "Indian Institute of Technology, Bombay",
  course: "B.Tech Computer Science & Engineering",
  year: "3rd Year (Class of 2026)",
  location: "Mumbai, India",
  role: "Student Freelancer",
  bio: "Passionate CS junior building high-performance web and mobile apps. Specializing in modern React, Node.js, and clean Tailwind design systems. Winner of Smart India Hackathon 2025. Love collaborating with campus startups and student ventures.",
  hourlyRate: 35,
  startingPrice: 50,
  rating: 4.9,
  reviewsCount: 38,
  completedProjectsCount: 24,
  completionRate: 98,
  responseTime: "< 2 hours",
  earningsTotal: 4250,
  earningsMonth: 920,
  profileCompletion: 92,
  socialLinks: {
    github: "https://github.com/arjunmehta-dev",
    linkedin: "https://linkedin.com/in/arjunmehta-cse",
    portfolio: "https://arjunmehta.tech",
    twitter: "https://twitter.com/arjun_codes",
  },
  skills: [
    { name: "React.js", category: "Technical", level: "Expert" },
    { name: "Next.js", category: "Technical", level: "Advanced" },
    { name: "TypeScript", category: "Technical", level: "Advanced" },
    { name: "Tailwind CSS", category: "Technical", level: "Expert" },
    { name: "Node.js", category: "Technical", level: "Intermediate" },
    { name: "Figma & UI Prototyping", category: "Technical", level: "Advanced" },
    { name: "PostgreSQL", category: "Technical", level: "Intermediate" },
    { name: "REST & GraphQL APIs", category: "Technical", level: "Advanced" },
    { name: "Agile Project Management", category: "Non-Technical", level: "Expert" },
    { name: "Client Communication", category: "Non-Technical", level: "Expert" },
    { name: "Design Thinking", category: "Non-Technical", level: "Advanced" },
  ],
  certifications: [
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "Aug 2025",
      badgeUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80"
    },
    {
      title: "Meta Frontend Developer Professional Certificate",
      issuer: "Meta / Coursera",
      date: "May 2025",
      badgeUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80"
    }
  ],
  education: [
    {
      institution: "Indian Institute of Technology, Bombay",
      degree: "Bachelor of Technology in Computer Science",
      period: "2023 - 2027",
      grade: "CGPA: 9.24 / 10"
    },
    {
      institution: "Delhi Public School, R.K. Puram",
      degree: "Higher Secondary (CBSE Class XII - Science)",
      period: "2021 - 2023",
      grade: "Score: 98.2%"
    }
  ]
};

export const initialPortfolio = [
  {
    id: "port-1",
    title: "UniEvents - Campus Ticketing & Event Hub",
    description: "Built an end-to-end event discovery and QR code ticketing platform for university clubs. Handled 4,500+ ticket bookings for the annual cultural festival.",
    technologies: ["React", "Tailwind CSS", "Node.js", "MongoDB", "Stripe API"],
    thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80"
    ],
    githubUrl: "https://github.com/arjunmehta-dev/unievents-portal",
    liveUrl: "https://unievents-demo.campuscraft.app",
    featured: true,
    likes: 42,
    date: "October 2025"
  },
  {
    id: "port-2",
    title: "DevSprint - Student Hackathon Dashboard",
    description: "A collaborative hackathon management system featuring real-time judging rubrics, team matching, and Discord bot integration.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "Supabase"],
    thumbnail: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80"
    ],
    githubUrl: "https://github.com/arjunmehta-dev/devsprint-hub",
    liveUrl: "https://devsprint.arjunmehta.tech",
    featured: true,
    likes: 58,
    date: "July 2025"
  },
  {
    id: "port-3",
    title: "StudyBuddy AI - Collaborative Peer Notes",
    description: "AI-assisted note summarizer and flashcard generator tailored for engineering exams. Features semantic search across PDF lecture slides.",
    technologies: ["React", "Python FastAPI", "LangChain", "Tailwind CSS", "ChromaDB"],
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80"
    ],
    githubUrl: "https://github.com/arjunmehta-dev/studybuddy-ai",
    liveUrl: "https://studybuddy-preview.vercel.app",
    featured: false,
    likes: 31,
    date: "February 2025"
  }
];

export const categories = [
  {
    id: "cat-web",
    name: "Web Development",
    icon: "Code",
    description: "Frontend, Full-stack, landing pages, responsive React/Vue apps & APIs",
    count: "480+ Freelancers",
    trending: true
  },
  {
    id: "cat-uiux",
    name: "UI/UX Design",
    icon: "Layout",
    description: "Figma wireframes, design systems, mobile mockups & interactive prototypes",
    count: "350+ Freelancers",
    trending: true
  },
  {
    id: "cat-graphic",
    name: "Graphic Design",
    icon: "Palette",
    description: "Logos, brand identity kits, posters, banners & social media creatives",
    count: "290+ Freelancers",
    trending: false
  },
  {
    id: "cat-writing",
    name: "Content Writing",
    icon: "PenTool",
    description: "Technical blogs, SEO copy, research summaries, college paper reviews & scripts",
    count: "210+ Freelancers",
    trending: false
  },
  {
    id: "cat-video",
    name: "Video Editing",
    icon: "Video",
    description: "YouTube shorts, Instagram reels, podcast editing, Premiere Pro & After Effects",
    count: "185+ Freelancers",
    trending: true
  },
  {
    id: "cat-marketing",
    name: "Digital Marketing",
    icon: "Megaphone",
    description: "Campus influencer campaigns, Google Ads, SEO growth & social media management",
    count: "160+ Freelancers",
    trending: false
  },
  {
    id: "cat-ai",
    name: "AI & Data Science",
    icon: "BrainCircuit",
    description: "Machine learning models, Python automation, data scraping & Jupyter analytics",
    count: "140+ Freelancers",
    trending: true
  },
  {
    id: "cat-mobile",
    name: "Mobile App Development",
    icon: "Smartphone",
    description: "React Native, Flutter, iOS & Android cross-platform mobile apps",
    count: "120+ Freelancers",
    trending: false
  }
];

export const mockFreelancers = [
  {
    id: "f-1",
    name: "Arjun Mehta",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    college: "IIT Bombay",
    course: "B.Tech Computer Science (3rd Yr)",
    title: "Full-Stack React & Node.js Developer",
    skills: ["React.js", "Tailwind CSS", "Node.js", "TypeScript", "Next.js"],
    bio: "Passionate developer building fast, responsive web applications and startup MVPs. 24 completed projects with 100% on-time delivery.",
    rating: 4.9,
    reviewsCount: 38,
    startingPrice: 50,
    hourlyRate: 35,
    category: "Web Development",
    experienceLevel: "Advanced",
    completedProjects: 24,
    badge: "Top Rated",
    isAvailable: true
  },
  {
    id: "f-2",
    name: "Ananya Sharma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    college: "BITS Pilani, Goa",
    course: "B.E. Electronics & Design (4th Yr)",
    title: "Product & UI/UX Designer | Figma Virtuoso",
    skills: ["Figma", "Design Systems", "User Research", "Wireframing", "Mobile UI"],
    bio: "Ex-intern at CRED. I design sleek, conversion-focused mobile and web apps that users fall in love with. Expert in Figma component libraries.",
    rating: 5.0,
    reviewsCount: 42,
    startingPrice: 65,
    hourlyRate: 40,
    category: "UI/UX Design",
    experienceLevel: "Expert",
    completedProjects: 31,
    badge: "Campus Star",
    isAvailable: true
  },
  {
    id: "f-3",
    name: "Rohan Varma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    college: "NIT Trichy",
    course: "B.Tech Mechanical & Data (3rd Yr)",
    title: "Video Editor & Motion Graphics Artist",
    skills: ["Premiere Pro", "After Effects", "Reels & Shorts", "Color Grading", "Sound Design"],
    bio: "Helping creators and campus clubs hit millions of views with viral-ready short-form edits and cinematic promo trailers.",
    rating: 4.8,
    reviewsCount: 29,
    startingPrice: 40,
    hourlyRate: 25,
    category: "Video Editing",
    experienceLevel: "Intermediate",
    completedProjects: 19,
    badge: "Fast Delivery",
    isAvailable: true
  },
  {
    id: "f-4",
    name: "Pooja Krishnan",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    college: "Delhi University (SRCC)",
    course: "B.Com (Hons) (3rd Yr)",
    title: "Brand Strategist & Content Writer",
    skills: ["SEO Writing", "Copywriting", "Tech Journalism", "Social Media", "Newsletters"],
    bio: "Published in student journals and tech publications. I craft high-retention blogs, landing page copy, and pitch deck narratives.",
    rating: 4.9,
    reviewsCount: 34,
    startingPrice: 30,
    hourlyRate: 20,
    category: "Content Writing",
    experienceLevel: "Advanced",
    completedProjects: 27,
    badge: "Top Rated",
    isAvailable: true
  },
  {
    id: "f-5",
    name: "Kabir Sengupta",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    college: "IIIT Hyderabad",
    course: "B.Tech + MS by Research (4th Yr)",
    title: "AI Engineer & Machine Learning Specialist",
    skills: ["Python", "PyTorch", "OpenAI APIs", "FastAPI", "Data Analysis"],
    bio: "Building custom LLM agents, automated web scrapers, and predictive data pipelines. Hackathon finalist with 3 research papers.",
    rating: 5.0,
    reviewsCount: 21,
    startingPrice: 80,
    hourlyRate: 45,
    category: "AI & Data Science",
    experienceLevel: "Expert",
    completedProjects: 15,
    badge: "AI Specialist",
    isAvailable: false
  },
  {
    id: "f-6",
    name: "Tanvi Deshmukh",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    college: "National Institute of Design (NID)",
    course: "B.Des Communication Design (3rd Yr)",
    title: "Brand Identity & Graphic Designer",
    skills: ["Illustrator", "Photoshop", "Logo Design", "Vector Art", "Packaging"],
    bio: "Crafting distinct visual identities and custom merch for collegiate fests, indie bands, and student startups.",
    rating: 4.7,
    reviewsCount: 18,
    startingPrice: 45,
    hourlyRate: 28,
    category: "Graphic Design",
    experienceLevel: "Advanced",
    completedProjects: 14,
    badge: "Creative Pro",
    isAvailable: true
  }
];

export const mockProjects = [
  {
    id: "proj-1",
    title: "Modern Landing Page & Booking UI for Campus Fest 'Mood Indigo'",
    category: "Web Development",
    description: "We are seeking a skilled student developer to build a modern, animated landing page with ticketing integration for our upcoming annual festival. Must be responsive with smooth scroll animations and mobile-first design.",
    budget: 350,
    budgetType: "Fixed Price",
    deadline: "2026-11-25",
    duration: "2-3 weeks",
    experienceLevel: "Intermediate",
    requiredSkills: ["React.js", "Tailwind CSS", "Framer Motion", "Responsive Design"],
    proposalsCount: 6,
    client: {
      name: "Devanshu Patel",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
      role: "Convenor, Cultural Council",
      college: "IIT Bombay",
      rating: 4.9,
      spent: "$1,840",
      projectsPosted: 7
    },
    status: "Open"
  },
  {
    id: "proj-2",
    title: "Mobile App UI/UX Redesign in Figma for Campus Laundry Startup",
    category: "UI/UX Design",
    description: "Redesign 12 core screens for our student laundry pickup and delivery app 'WashDrop'. Needs modern checkout flow, order tracking map view, and dark mode design system in Figma.",
    budget: 280,
    budgetType: "Fixed Price",
    deadline: "2026-11-18",
    duration: "10 days",
    experienceLevel: "Advanced",
    requiredSkills: ["Figma", "Mobile UI", "Design Systems", "Prototyping"],
    proposalsCount: 11,
    client: {
      name: "Sneha Mukherjee",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
      role: "Co-Founder",
      college: "BITS Pilani",
      rating: 5.0,
      spent: "$950",
      projectsPosted: 3
    },
    status: "Open"
  },
  {
    id: "proj-3",
    title: "Promo Reel & 4 YouTube Shorts Video Editing for Tech Club",
    category: "Video Editing",
    description: "Looking for an energetic video editor to turn raw footage from our 48-hour hackathon into 1 hype recap video (90 sec) and 4 viral vertical shorts for Instagram/TikTok with dynamic captions and sound effects.",
    budget: 150,
    budgetType: "Fixed Price",
    deadline: "2026-11-14",
    duration: "5 days",
    experienceLevel: "Intermediate",
    requiredSkills: ["Premiere Pro", "After Effects", "Reels/TikTok", "Sound Design"],
    proposalsCount: 4,
    client: {
      name: "Aditya Roy",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
      role: "Head of Media",
      college: "Delhi Technological University",
      rating: 4.8,
      spent: "$600",
      projectsPosted: 4
    },
    status: "Open"
  },
  {
    id: "proj-4",
    title: "Technical Content Writing: 4 Deep-Dive Articles on Web3 & AI",
    category: "Content Writing",
    description: "Need a student researcher/writer to compose four 1,500-word SEO-optimized articles on decentralized AI compute and smart contract security. Must cite recent academic papers and GitHub repositories.",
    budget: 200,
    budgetType: "Fixed Price",
    deadline: "2026-11-30",
    duration: "3 weeks",
    experienceLevel: "Advanced",
    requiredSkills: ["Technical Writing", "SEO", "Research", "Blockchain Basics"],
    proposalsCount: 8,
    client: {
      name: "Karan Johar",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
      role: "Founder, ByteScale Media",
      college: "NIT Karnataka",
      rating: 4.7,
      spent: "$3,100",
      projectsPosted: 12
    },
    status: "Open"
  },
  {
    id: "proj-5",
    title: "Build Automated Python Scraper & Telegram Alert Bot",
    category: "AI & Data Science",
    description: "Develop a lightweight Python script that monitors university placement notices and course registration openings every 15 minutes, with instant notifications delivered to an authenticated Telegram channel.",
    budget: 180,
    budgetType: "Fixed Price",
    deadline: "2026-11-16",
    duration: "1 week",
    experienceLevel: "Intermediate",
    requiredSkills: ["Python", "BeautifulSoup / Playwright", "Telegram Bot API", "Docker"],
    proposalsCount: 9,
    client: {
      name: "Meera Nair",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      role: "Placement Coordinator",
      college: "Anna University",
      rating: 4.9,
      spent: "$850",
      projectsPosted: 2
    },
    status: "Open"
  }
];

export const initialServices = [
  {
    id: "srv-1",
    freelancerId: "student-1",
    freelancerName: "Arjun Mehta",
    freelancerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    freelancerCollege: "IIT Bombay",
    title: "I will build a high-converting responsive React & Tailwind website",
    category: "Web Development",
    rating: 4.9,
    reviewsCount: 28,
    startingPrice: 60,
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    tags: ["React.js", "Tailwind CSS", "Responsive", "SEO", "Vite"],
    packages: {
      basic: {
        name: "Starter Landing Page",
        price: 60,
        deliveryDays: 3,
        revisions: 2,
        description: "Single responsive landing page with contact form, mobile optimization, and standard clean animations.",
        features: [
          "1 Page Responsive Layout",
          "Tailwind CSS Clean Styling",
          "Contact Form Integration",
          "Mobile & Tablet Optimized",
          "Source Code Included"
        ]
      },
      standard: {
        name: "Multi-Page Web App",
        price: 140,
        deliveryDays: 6,
        revisions: 4,
        description: "Up to 5 pages with custom interactive components, API connection, dynamic forms, and SEO meta tags.",
        features: [
          "Up to 5 Custom Pages",
          "API Integration (REST / Supabase)",
          "Interactive State & Filtering",
          "Performance Optimization",
          "4 Revisions Included",
          "Free Deployment on Vercel/Netlify"
        ]
      },
      premium: {
        name: "Full-Stack SaaS MVP",
        price: 320,
        deliveryDays: 14,
        revisions: "Unlimited",
        description: "Complete full-stack web application with authentication, database models, payment gateway integration, and admin dashboard.",
        features: [
          "Complete MVP Web Platform",
          "User Auth & Protected Routes",
          "Database & Backend API",
          "Payment Gateway Integration",
          "Admin Analytics Dashboard",
          "Unlimited Revisions during dev",
          "30 Days Free Post-launch Support"
        ]
      }
    }
  },
  {
    id: "srv-2",
    freelancerId: "f-2",
    freelancerName: "Ananya Sharma",
    freelancerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    freelancerCollege: "BITS Pilani",
    title: "I will design an intuitive UI/UX design system and prototype in Figma",
    category: "UI/UX Design",
    rating: 5.0,
    reviewsCount: 34,
    startingPrice: 75,
    thumbnail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80",
    tags: ["Figma", "UI/UX", "Mobile App", "Design System", "Wireframes"],
    packages: {
      basic: {
        name: "Wireframe & Style Guide",
        price: 75,
        deliveryDays: 2,
        revisions: 2,
        description: "Low-fidelity wireframes + typography and color palette palette.",
        features: ["3 Screens", "Style Guide", "Figma File Access", "2 Revisions"]
      },
      standard: {
        name: "High-Fidelity App UI",
        price: 160,
        deliveryDays: 5,
        revisions: 5,
        description: "Up to 8 high-fidelity mobile/web screens with interactive clickable prototyping.",
        features: ["8 High-Fidelity Screens", "Interactive Prototype", "Component Library", "5 Revisions"]
      },
      premium: {
        name: "Complete Product Design",
        price: 350,
        deliveryDays: 12,
        revisions: "Unlimited",
        description: "Full design system, 20+ screens, user flow diagrams, and developer handoff specs.",
        features: ["20+ Screens", "Full Design System & Tokens", "Clickable Flow Prototype", "Dev Handoff Redlines"]
      }
    }
  },
  {
    id: "srv-3",
    freelancerId: "f-3",
    freelancerName: "Rohan Varma",
    freelancerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    freelancerCollege: "NIT Trichy",
    title: "I will edit viral reels, shorts, and cinematic promo videos",
    category: "Video Editing",
    rating: 4.8,
    reviewsCount: 22,
    startingPrice: 40,
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80",
    tags: ["Premiere Pro", "After Effects", "Reels", "Shorts", "Subtitles"],
    packages: {
      basic: {
        name: "Single 60s Reel",
        price: 40,
        deliveryDays: 2,
        revisions: 2,
        description: "1 vertical video with engaging motion subtitles, sound FX, and color correction.",
        features: ["60s Video", "Dynamic Captions", "Sound Design", "2 Revisions"]
      },
      standard: {
        name: "Bundle of 4 Reels",
        price: 120,
        deliveryDays: 4,
        revisions: 4,
        description: "4 optimized short videos ready for IG Reels/TikTok/YouTube Shorts.",
        features: ["4 Reels", "Custom Brand Fonts & Emojis", "Background Music", "4 Revisions"]
      },
      premium: {
        name: "Monthly Creator Package",
        price: 280,
        deliveryDays: 10,
        revisions: "Unlimited",
        description: "12 high-retention reels + 1 long form YouTube video editing with thumbnails.",
        features: ["12 Shorts/Reels", "1 Long-form Edit (up to 15m)", "Custom Thumbnails", "Priority Support"]
      }
    }
  }
];

export const initialOrders = [
  {
    id: "ord-8021",
    serviceTitle: "Multi-Page Web App for College Placement Portal",
    clientName: "Placement Cell, IIT Bombay",
    clientEmail: "placements@iitb.ac.in",
    clientAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
    freelancerName: "Arjun Mehta",
    agreedAmount: 240,
    orderDate: "2026-11-01",
    deliveryDate: "2026-11-12",
    stage: 2, // 1: Order Confirmed, 2: Work in Progress, 3: Submitted for Review, 4: Revision Requested, 5: Completed
    status: "Active",
    scope: "Building 4 pages: Student directory, Company job listing, Application tracking, and Resume preview modal.",
    deliverables: "GitHub repository with Vite React code + live Vercel deployment link.",
    revisionPolicy: "Up to 3 minor revisions within 7 days of final delivery.",
    paymentStatus: "Escrow Secured ($240 held safely by CampusCraft Guarantee)",
    updates: [
      { timestamp: "Nov 01, 2026", message: "Order placed and payment funded into CampusCraft Escrow." },
      { timestamp: "Nov 02, 2026", message: "Kickoff call concluded. Wireframes and component structure approved." },
      { timestamp: "Nov 04, 2026", message: "Student directory filter & search completed." }
    ]
  },
  {
    id: "ord-7914",
    serviceTitle: "Starter Landing Page for 'EcoCups' Campus Venture",
    clientName: "Riddhima Sen",
    clientEmail: "riddhima.sen@bits.ac.in",
    clientAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    freelancerName: "Arjun Mehta",
    agreedAmount: 90,
    orderDate: "2026-10-25",
    deliveryDate: "2026-10-29",
    stage: 5,
    status: "Completed",
    scope: "Single page green aesthetic landing page with pre-order email collection form.",
    deliverables: "Clean responsive HTML/Tailwind files + Google Form integration.",
    revisionPolicy: "2 revisions included.",
    paymentStatus: "Released to Freelancer ($90 received)",
    updates: [
      { timestamp: "Oct 25, 2026", message: "Order confirmed." },
      { timestamp: "Oct 27, 2026", message: "Draft site preview shared." },
      { timestamp: "Oct 29, 2026", message: "Final files handed over. Client marked completed with 5-star rating!" }
    ]
  },
  {
    id: "ord-8099",
    serviceTitle: "Hackathon Judging Dashboard (Full-Stack MVP)",
    clientName: "ACM Student Chapter",
    clientEmail: "acm.chapter@delhi.edu",
    clientAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
    freelancerName: "Arjun Mehta",
    agreedAmount: 320,
    orderDate: "2026-11-03",
    deliveryDate: "2026-11-17",
    stage: 3,
    status: "In Review",
    scope: "Live scoring dashboard, timer syncing, and CSV export for 60 hackathon teams.",
    deliverables: "Dockerized Node API + React dashboard.",
    revisionPolicy: "Unlimited during review window.",
    paymentStatus: "Escrow Secured ($320 held safely by CampusCraft Guarantee)",
    updates: [
      { timestamp: "Nov 03, 2026", message: "Order started." },
      { timestamp: "Nov 05, 2026", message: "First working release submitted for client review." }
    ]
  }
];

export const initialConversations = [
  {
    id: "conv-1",
    user: {
      name: "Devanshu Patel",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
      role: "Convenor, Cultural Council",
      college: "IIT Bombay",
      status: "online"
    },
    projectTitle: "Mood Indigo Fest Landing Page",
    lastMessage: "Sounds great Arjun! Can we also include dark mode toggle on the ticketing screen?",
    timestamp: "10:32 AM",
    unread: 1,
    messages: [
      {
        id: "m1",
        sender: "them",
        text: "Hi Arjun, saw your UniEvents portfolio project. Incredible work on the QR ticketing!",
        time: "10:15 AM",
        status: "read"
      },
      {
        id: "m2",
        sender: "me",
        text: "Thank you Devanshu! Yes, that handled high-concurrency traffic during our campus fest without a hitch.",
        time: "10:20 AM",
        status: "read"
      },
      {
        id: "m3",
        sender: "them",
        text: "We want to hire you for our Mood Indigo portal ($350 budget). Can we deliver by Nov 25th?",
        time: "10:24 AM",
        status: "read"
      },
      {
        id: "m4",
        sender: "me",
        text: "Nov 25th is very doable. I can provide the staging link by Nov 18th for initial review and feedback.",
        time: "10:28 AM",
        status: "read"
      },
      {
        id: "m5",
        sender: "them",
        text: "Sounds great Arjun! Can we also include dark mode toggle on the ticketing screen?",
        time: "10:32 AM",
        status: "read"
      }
    ]
  },
  {
    id: "conv-2",
    user: {
      name: "Riddhima Sen",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
      role: "Founder, EcoCups",
      college: "BITS Pilani",
      status: "offline"
    },
    projectTitle: "Starter Landing Page for EcoCups",
    lastMessage: "Thanks again for the lightning fast delivery! I just left a 5-star review.",
    timestamp: "Yesterday",
    unread: 0,
    messages: [
      {
        id: "m201",
        sender: "me",
        text: "Hi Riddhima, I've pushed the final code repository to your GitHub and deployed the DNS.",
        time: "Yesterday 4:10 PM",
        status: "read"
      },
      {
        id: "m202",
        sender: "them",
        text: "Thanks again for the lightning fast delivery! I just left a 5-star review.",
        time: "Yesterday 5:22 PM",
        status: "read"
      }
    ]
  },
  {
    id: "conv-3",
    user: {
      name: "Sneha Mukherjee",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      role: "Product Lead",
      college: "IIT Delhi",
      status: "online"
    },
    projectTitle: "WashDrop Laundry App Consultation",
    lastMessage: "Could you send over your availability for a 15-minute sync this evening?",
    timestamp: "Nov 03",
    unread: 0,
    messages: [
      {
        id: "m301",
        sender: "them",
        text: "Hey Arjun! We are reviewing applicant proposals for our mobile UI flow.",
        time: "Nov 03 11:00 AM",
        status: "read"
      },
      {
        id: "m302",
        sender: "them",
        text: "Could you send over your availability for a 15-minute sync this evening?",
        time: "Nov 03 11:05 AM",
        status: "read"
      }
    ]
  }
];

export const mockReviews = [
  {
    id: "rev-1",
    clientName: "Riddhima Sen",
    clientRole: "Founder, EcoCups",
    clientCollege: "BITS Pilani",
    clientAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    date: "October 30, 2026",
    projectTitle: "Starter Landing Page for EcoCups",
    comment: "Arjun is a phenomenal developer! He understood our startup's aesthetic immediately and delivered a flawless, hyper-responsive website in under 4 days. Zero bugs, seamless communication. Will definitely hire again!",
    tags: ["On-time Delivery", "Clean Code", "High Quality", "Great Communication"]
  },
  {
    id: "rev-2",
    clientName: "Prof. S. Ranganathan",
    clientRole: "Faculty In-Charge, Robotics Lab",
    clientCollege: "IIT Bombay",
    clientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    date: "October 14, 2026",
    projectTitle: "Lab Equipment Reservation Portal",
    comment: "Arjun built an intuitive lab slot scheduling tool for over 200 research students. His knowledge of database schemas and authentication kept our server secure. Extremely reliable student engineer.",
    tags: ["Technical Depth", "Reliable", "Security Conscious"]
  },
  {
    id: "rev-3",
    clientName: "Aditya Roy",
    clientRole: "Lead Coordinator, E-Cell",
    clientCollege: "DTU",
    clientAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
    rating: 4.8,
    date: "September 28, 2026",
    projectTitle: "Startup Summit Registration System",
    comment: "Excellent experience. Handled sudden last minute requirement changes with grace. The UI looked very premium compared to other college portals.",
    tags: ["Adaptable", "Speedy Delivery"]
  }
];

export const platformStats = {
  activeStudents: "12,450+",
  projectsCompleted: "8,920+",
  freelancers: "4,600+",
  totalSkillsListed: "150+"
};

export const sampleColleges = [
  "All Colleges",
  "IIT Bombay",
  "IIT Delhi",
  "BITS Pilani",
  "NIT Trichy",
  "IIIT Hyderabad",
  "Delhi University",
  "National Institute of Design (NID)",
  "DTU",
  "Anna University"
];

