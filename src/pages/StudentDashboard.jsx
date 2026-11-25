import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  DollarSign, 
  Briefcase, 
  CheckCircle, 
  Eye, 
  Clock, 
  ArrowUpRight, 
  Plus, 
  Sparkles, 
  Calendar,
  AlertCircle,
  TrendingUp,
  MessageSquare,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatCard from '../components/StatCard';
import ProjectCard from '../components/ProjectCard';

export const StudentDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, orders, projects, userRole, toggleRole } = useApp();

  const activeOrders = orders.filter(o => o.status === 'Active' || o.stage < 5);
  const completedOrders = orders.filter(o => o.stage === 5 || o.status === 'Completed');
  const recommendedProjects = projects.slice(0, 2);

  // Deadlines calculated from active orders
  const upcomingDeadlines = [
    {
      id: "dl-1",
      title: "Placement Portal Directory Filters",
      project: "IIT Bombay Placement Cell",
      due: "In 7 days (Nov 12)",
      priority: "High",
      stage: "Stage 2: Work in Progress"
    },
    {
      id: "dl-2",
      title: "Hackathon Scoring Backend Sync",
      project: "ACM Student Chapter",
      due: "In 12 days (Nov 17)",
      priority: "Medium",
      stage: "Stage 3: Under Review"
    }
  ];

  const recentActivities = [
    {
      id: "act-1",
      title: "Milestone Submitted for Review",
      desc: "Shared staging URL for Placement Portal to Devanshu Patel",
      time: "2 hours ago",
      icon: Clock,
      color: "text-brand-600 bg-brand-50"
    },
    {
      id: "act-2",
      title: "5-Star Review Received",
      desc: "Riddhima Sen left feedback: 'Lightning fast delivery!'",
      time: "Yesterday",
      icon: Sparkles,
      color: "text-amber-500 bg-amber-50"
    },
    {
      id: "act-3",
      title: "Escrow Payment Funded",
      desc: "$320 secured by ACM Chapter for Hackathon Dashboard",
      time: "2 days ago",
      icon: ShieldCheck,
      color: "text-emerald-600 bg-emerald-50"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-600 via-indigo-600 to-violetAccent-600 rounded-3xl p-6 md:p-8 text-white shadow-soft-lg relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/10 blur-2xl pointer-events-none rounded-full" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-white/15 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
              <Sparkles size={13} className="text-amber-300" />
              <span>CampusCraft Verified Creator</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {currentUser.name.split(' ')[0]}! 🎓
            </h1>
            <p className="text-xs sm:text-sm text-brand-100 max-w-xl leading-relaxed">
              You have <strong className="text-white underline">{activeOrders.length} active projects</strong> underway with <strong className="text-white">$560</strong> secured safely in escrow.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => navigate('/profile?action=add-project')}
              className="px-4 py-2.5 rounded-xl bg-white text-brand-700 hover:bg-brand-50 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <Plus size={15} />
              <span>Add Portfolio Project</span>
            </button>
            <button
              onClick={() => navigate('/dashboard/services?action=create')}
              className="px-4 py-2.5 rounded-xl bg-brand-700/70 hover:bg-brand-700 text-white font-bold text-xs border border-brand-400/40 transition-all flex items-center gap-1.5"
            >
              <Briefcase size={14} />
              <span>Create Service</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Earnings"
          value={`$${currentUser.earningsTotal?.toLocaleString() || '4,250'}`}
          subtitle={`+$${currentUser.earningsMonth || '920'} this month`}
          icon={DollarSign}
          trend="+18%"
          trendType="up"
          colorClass="brand"
        />
        <StatCard
          title="Active Projects"
          value={activeOrders.length.toString()}
          subtitle="All milestones in escrow"
          icon={Briefcase}
          trend="2 in progress"
          trendType="up"
          colorClass="violet"
        />
        <StatCard
          title="Completed Projects"
          value={currentUser.completedProjectsCount?.toString() || '24'}
          subtitle="98% on-time delivery rate"
          icon={CheckCircle}
          trend="+3 this term"
          trendType="up"
          colorClass="emerald"
        />
        <StatCard
          title="Profile Views"
          value="348"
          subtitle="From campus founders & clubs"
          icon={Eye}
          trend="+24% this week"
          trendType="up"
          colorClass="amber"
        />
      </div>

      {/* Main 2-Column Content: Left (Active Orders & Deadlines) / Right (Profile Strength, Activity & Recommendations) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 cols wide on desktop) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Active Orders Tracker Card */}
          <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-soft space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-surface-text">Active Orders & Escrow Status</h3>
                <p className="text-xs text-surface-muted">Current gigs and development milestones</p>
              </div>
              <Link
                to="/dashboard/orders"
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                <span>View All ({orders.length})</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            <div className="space-y-4">
              {activeOrders.map((ord) => (
                <div
                  key={ord.id}
                  onClick={() => navigate('/dashboard/orders')}
                  className="p-4 rounded-2xl bg-slate-50/70 border border-surface-border hover:border-brand-300 transition-all cursor-pointer group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-surface-text group-hover:text-brand-600 transition-colors">
                      {ord.serviceTitle}
                    </span>
                    <span className="text-xs font-extrabold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-lg self-start sm:self-auto">
                      ${ord.agreedAmount}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-surface-muted mb-3">
                    <span>Client: <strong className="text-surface-text">{ord.clientName}</strong></span>
                    <span>Due: <strong className="text-surface-text">{ord.deliveryDate}</strong></span>
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <ShieldCheck size={13} />
                      {ord.paymentStatus.includes('Escrow') ? 'Escrow Protected' : 'Paid'}
                    </span>
                  </div>

                  {/* Micro Progress Bar */}
                  <div>
                    <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
                      <span>Stage {ord.stage} of 5</span>
                      <span>
                        {ord.stage === 1 && "Order Confirmed"}
                        {ord.stage === 2 && "Work in Progress"}
                        {ord.stage === 3 && "Submitted for Review"}
                        {ord.stage === 4 && "Revision Requested"}
                        {ord.stage === 5 && "Completed"}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-brand-600 h-1.5 rounded-full transition-all"
                        style={{ width: `${(ord.stage / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Projects for You */}
          <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-soft space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-surface-text">Recommended Projects</h3>
                <p className="text-xs text-surface-muted">Matching your skills in React, Tailwind & UI/UX</p>
              </div>
              <Link
                to="/projects"
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                <span>Explore All</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedProjects.map((proj) => (
                <ProjectCard key={proj.id} project={proj} onApply={() => navigate(`/projects?apply=${proj.id}`)} />
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Deadlines, Profile Completion, Recent Activity */}
        <div className="space-y-6">
          
          {/* Profile Completion Box */}
          <div className="bg-white rounded-2xl border border-surface-border p-5 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-surface-muted">
                Profile Strength
              </span>
              <span className="text-xs font-extrabold text-brand-600">
                {currentUser.profileCompletion || 92}%
              </span>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-brand-600 to-violetAccent-600 h-2.5 rounded-full"
                style={{ width: `${currentUser.profileCompletion || 92}%` }}
              />
            </div>

            <p className="text-xs text-slate-600 leading-snug">
              Complete your profile to rank higher in recruiter searches:
            </p>

            <ul className="text-xs space-y-1.5 text-slate-700 pt-1">
              <li className="flex items-center gap-2 text-emerald-600">
                <CheckCircle size={14} />
                <span>Verified College Email</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-600">
                <CheckCircle size={14} />
                <span>3 Portfolio Projects Added</span>
              </li>
              <li className="flex items-center gap-2 text-slate-500">
                <div className="w-3.5 h-3.5 rounded-full border border-slate-300 ml-0.5" />
                <span>Add 1 More Hackathon/Certificate</span>
              </li>
            </ul>

            <button
              onClick={() => navigate('/profile')}
              className="w-full mt-2 py-2 rounded-xl border border-brand-200 text-brand-700 bg-brand-50 hover:bg-brand-100 text-xs font-bold transition-colors text-center"
            >
              Update Profile Details
            </button>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-2xl border border-surface-border p-5 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs uppercase tracking-wider text-surface-muted">
                Upcoming Deadlines
              </h4>
              <Clock size={15} className="text-brand-600" />
            </div>

            <div className="space-y-3">
              {upcomingDeadlines.map((dl) => (
                <div key={dl.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-surface-text truncate max-w-[170px]">{dl.title}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      dl.priority === 'High' ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {dl.due}
                    </span>
                  </div>
                  <p className="text-[11px] text-surface-muted truncate">{dl.project}</p>
                  <p className="text-[10px] text-brand-600 font-semibold">{dl.stage}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div className="bg-white rounded-2xl border border-surface-border p-5 shadow-soft space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-surface-muted">
              Recent Activity
            </h4>

            <div className="space-y-3">
              {recentActivities.map((act) => {
                const Icon = act.icon;
                return (
                  <div key={act.id} className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl shrink-0 ${act.color}`}>
                      <Icon size={14} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-surface-text">{act.title}</p>
                      <p className="text-[11px] text-slate-600 leading-snug">{act.desc}</p>
                      <span className="text-[10px] text-surface-muted block mt-0.5">{act.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;

