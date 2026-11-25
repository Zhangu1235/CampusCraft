import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialCurrentUser,
  initialPortfolio,
  initialServices,
  mockProjects,
  initialOrders,
  initialConversations,
  mockReviews,
  mockFreelancers
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Current user state with local storage persistence
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('campuscraft_user');
    return saved ? JSON.parse(saved) : initialCurrentUser;
  });

  // Current role mode: 'student' or 'client'
  const [userRole, setUserRole] = useState(() => {
    const saved = localStorage.getItem('campuscraft_role');
    return saved || 'student';
  });

  // Portfolio items
  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem('campuscraft_portfolio');
    return saved ? JSON.parse(saved) : initialPortfolio;
  });

  // Services published
  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('campuscraft_services');
    return saved ? JSON.parse(saved) : initialServices;
  });

  // Projects listed
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('campuscraft_projects');
    return saved ? JSON.parse(saved) : mockProjects;
  });

  // Freelancers list
  const [freelancers, setFreelancers] = useState(() => {
    const saved = localStorage.getItem('campuscraft_freelancers');
    return saved ? JSON.parse(saved) : mockFreelancers;
  });

  // Orders and tracking
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('campuscraft_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  // Messages and conversations
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem('campuscraft_conversations');
    return saved ? JSON.parse(saved) : initialConversations;
  });

  // Reviews
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('campuscraft_reviews');
    return saved ? JSON.parse(saved) : mockReviews;
  });

  // Applications
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('campuscraft_applications');
    return saved ? JSON.parse(saved) : [
      {
        id: "app-1",
        projectId: "proj-1",
        projectTitle: "Modern Landing Page & Booking UI for Campus Fest 'Mood Indigo'",
        bidAmount: 320,
        timeline: "14 days",
        coverLetter: "Hi Devanshu, I've built multiple event websites before including UniEvents which served 4,500+ students. I would love to build this with Vite and Tailwind.",
        appliedDate: "2026-11-04",
        status: "Under Review"
      }
    ];
  });

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Sync back to local storage
  useEffect(() => {
    localStorage.setItem('campuscraft_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('campuscraft_role', userRole);
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem('campuscraft_portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  useEffect(() => {
    localStorage.setItem('campuscraft_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('campuscraft_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('campuscraft_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('campuscraft_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('campuscraft_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('campuscraft_applications', JSON.stringify(applications));
  }, [applications]);

  // Actions
  const toggleRole = () => {
    const newRole = userRole === 'student' ? 'client' : 'student';
    setUserRole(newRole);
    showToast(`Switched view to ${newRole === 'student' ? 'Student Freelancer' : 'Client / Recruiter'} mode`, 'info');
  };

  const updateUserProfile = (updatedFields) => {
    setCurrentUser(prev => ({ ...prev, ...updatedFields }));
    showToast('Profile updated successfully!');
  };

  const addSkill = (newSkill) => {
    if (!newSkill.name) return;
    if (currentUser.skills.some(s => s.name.toLowerCase() === newSkill.name.toLowerCase())) {
      showToast('Skill already exists in your profile', 'warning');
      return;
    }
    setCurrentUser(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
    showToast(`Added ${newSkill.name} to your skills!`);
  };

  const removeSkill = (skillName) => {
    setCurrentUser(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.name !== skillName)
    }));
    showToast(`Removed ${skillName} from profile`, 'info');
  };

  const addPortfolioProject = (project) => {
    const newProject = {
      ...project,
      id: `port-${Date.now()}`,
      likes: 0,
      date: 'Just now'
    };
    setPortfolio(prev => [newProject, ...prev]);
    showToast('Project added to your portfolio!');
  };

  const updatePortfolioProject = (id, updatedProject) => {
    setPortfolio(prev => prev.map(p => p.id === id ? { ...p, ...updatedProject } : p));
    showToast('Portfolio project updated!');
  };

  const deletePortfolioProject = (id) => {
    setPortfolio(prev => prev.filter(p => p.id !== id));
    showToast('Project removed from portfolio', 'info');
  };

  const createService = (serviceData) => {
    const newService = {
      ...serviceData,
      id: `srv-${Date.now()}`,
      freelancerId: currentUser.id,
      freelancerName: currentUser.name,
      freelancerAvatar: currentUser.avatar,
      freelancerCollege: currentUser.college,
      rating: 5.0,
      reviewsCount: 0,
    };
    setServices(prev => [newService, ...prev]);
    showToast('New service published to marketplace!');
    return newService;
  };

  const applyToProject = (projectId, proposal) => {
    const proj = projects.find(p => p.id === projectId);
    const newApp = {
      id: `app-${Date.now()}`,
      projectId,
      projectTitle: proj ? proj.title : "Project Proposal",
      bidAmount: proposal.bidAmount,
      timeline: proposal.timeline,
      coverLetter: proposal.coverLetter,
      appliedDate: new Date().toISOString().split('T')[0],
      status: "Submitted"
    };
    setApplications(prev => [newApp, ...prev]);
    // increment proposal count in project
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, proposalsCount: (p.proposalsCount || 0) + 1 } : p));
    showToast('Proposal submitted successfully!');
  };

  const createOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: `ord-${Math.floor(1000 + Math.random() * 9000)}`,
      orderDate: new Date().toISOString().split('T')[0],
      stage: 1, // Order Confirmed
      status: "Active",
      paymentStatus: `Escrow Secured ($${orderData.agreedAmount} held safely by CampusCraft Guarantee)`,
      updates: [
        {
          timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          message: "Order placed and payment secured in CampusCraft Escrow."
        }
      ]
    };
    setOrders(prev => [newOrder, ...prev]);
    showToast(`Order #${newOrder.id} confirmed and escrow funded!`);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStage, note = "") => {
    const stageNames = {
      1: "Order Confirmed",
      2: "Work in Progress",
      3: "Submitted for Review",
      4: "Revision Requested",
      5: "Completed"
    };

    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        const stageNum = Number(newStage);
        const isCompleted = stageNum === 5;
        const statusText = isCompleted ? "Completed" : stageNum === 4 ? "Revision" : "Active";
        const newUpdate = {
          timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          message: note || `Order updated to: ${stageNames[stageNum]}`
        };
        return {
          ...ord,
          stage: stageNum,
          status: statusText,
          paymentStatus: isCompleted ? `Released to Freelancer ($${ord.agreedAmount} paid)` : ord.paymentStatus,
          updates: [...(ord.updates || []), newUpdate]
        };
      }
      return ord;
    }));

    showToast(`Order status updated to: ${stageNames[newStage]}`);
  };

  const sendMessage = (conversationId, text, attachment = null) => {
    if (!text.trim() && !attachment) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: "me",
      text,
      time: timeStr,
      status: "delivered",
      attachment: attachment || null
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          lastMessage: text || (attachment ? `Sent file: ${attachment.name}` : ""),
          timestamp: timeStr,
          messages: [...conv.messages, newMsg]
        };
      }
      return conv;
    }));
  };

  const startConversationWith = (targetUser, initialText = "Hi! I'm interested in discussing a project.", projectTitle = "Project Consultation") => {
    // Check if conversation already exists
    const existing = conversations.find(c => c.user.name === targetUser.name);
    if (existing) {
      if (initialText) {
        sendMessage(existing.id, initialText);
      }
      return existing.id;
    }

    const newConvId = `conv-${Date.now()}`;
    const newConv = {
      id: newConvId,
      user: {
        name: targetUser.name,
        avatar: targetUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
        role: targetUser.title || targetUser.role || "Freelancer",
        college: targetUser.college || "Campus Member",
        status: "online"
      },
      projectTitle: projectTitle,
      lastMessage: initialText,
      timestamp: "Just now",
      unread: 0,
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: "me",
          text: initialText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: "delivered"
        }
      ]
    };

    setConversations(prev => [newConv, ...prev]);
    showToast(`Started conversation with ${targetUser.name}`);
    return newConvId;
  };

  const addReview = (reviewData) => {
    const newReview = {
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      ...reviewData
    };
    setReviews(prev => [newReview, ...prev]);
    showToast('Feedback and rating published!');
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      userRole,
      setUserRole,
      toggleRole,
      portfolio,
      services,
      projects,
      freelancers,
      orders,
      conversations,
      reviews,
      applications,
      toast,
      showToast,
      updateUserProfile,
      addSkill,
      removeSkill,
      addPortfolioProject,
      updatePortfolioProject,
      deletePortfolioProject,
      createService,
      applyToProject,
      createOrder,
      updateOrderStatus,
      sendMessage,
      startConversationWith,
      addReview
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

