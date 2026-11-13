import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/StudentDashboard';
import StudentProfile from './pages/StudentProfile';
import PublicProfile from './pages/PublicProfile';
import ExploreFreelancers from './pages/ExploreFreelancers';
import ExploreProjects from './pages/ExploreProjects';
import MyServices from './pages/MyServices';
import ProjectDetails from './pages/ProjectDetails';
import MessagingPage from './pages/MessagingPage';
import OrdersPage from './pages/OrdersPage';
import ReviewsPage from './pages/ReviewsPage';
import MyApplications from './pages/MyApplications';
import SettingsPage from './pages/SettingsPage';
import { useApp } from './context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

// Dashboard layout wrapper with sidebar
const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

// Standard page layout with navbar and footer
const PublicLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export const App = () => {
  const { toast } = useApp();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-surface-bg text-surface-text">
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce [animation-duration:0.6s]">
          <div className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl text-xs font-bold border ${
            toast.type === 'warning'
              ? 'bg-amber-50 text-amber-900 border-amber-300'
              : toast.type === 'info'
              ? 'bg-slate-900 text-white border-slate-700'
              : 'bg-emerald-600 text-white border-emerald-500'
          }`}>
            {toast.type === 'warning' ? (
              <AlertCircle size={16} />
            ) : toast.type === 'info' ? (
              <Info size={16} />
            ) : (
              <CheckCircle2 size={16} />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Main App Routes */}
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />

        {/* Auth Pages */}
        <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />
        <Route path="/register" element={<PublicLayout><RegisterPage /></PublicLayout>} />

        {/* Public Marketplace Exploration */}
        <Route path="/freelancers" element={<PublicLayout><ExploreFreelancers /></PublicLayout>} />
        <Route path="/projects" element={<PublicLayout><ExploreProjects /></PublicLayout>} />
        <Route path="/services" element={<PublicLayout><MyServices /></PublicLayout>} />
        <Route path="/services/:id" element={<PublicLayout><ProjectDetails /></PublicLayout>} />
        <Route path="/reviews" element={<PublicLayout><ReviewsPage /></PublicLayout>} />

        {/* Profile Views */}
        <Route path="/profile" element={<PublicLayout><StudentProfile /></PublicLayout>} />
        <Route path="/profile/:id" element={<PublicLayout><PublicProfile /></PublicLayout>} />

        {/* Dashboard Routes with Sidebar */}
        <Route path="/dashboard" element={<DashboardLayout><StudentDashboard /></DashboardLayout>} />
        <Route path="/dashboard/portfolio" element={<DashboardLayout><StudentProfile /></DashboardLayout>} />
        <Route path="/dashboard/services" element={<DashboardLayout><MyServices /></DashboardLayout>} />
        <Route path="/dashboard/orders" element={<DashboardLayout><OrdersPage /></DashboardLayout>} />
        <Route path="/dashboard/messages" element={<DashboardLayout><MessagingPage /></DashboardLayout>} />
        <Route path="/dashboard/applications" element={<DashboardLayout><MyApplications /></DashboardLayout>} />
        <Route path="/dashboard/settings" element={<DashboardLayout><SettingsPage /></DashboardLayout>} />

        {/* Catch-all redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;

