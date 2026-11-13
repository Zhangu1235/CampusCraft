import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  Code, 
  Layout, 
  Palette, 
  PenTool, 
  Video, 
  Megaphone, 
  BrainCircuit, 
  Smartphone,
  TrendingUp,
  Award,
  Users,
  Briefcase
} from 'lucide-react';
import { categories, mockFreelancers, platformStats } from '../data/mockData';
import FreelancerCard from '../components/FreelancerCard';
import RatingStars from '../components/RatingStars';

export const LandingPage = () => {
  const navigate = useNavigate();

  // Category Icon resolver
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Code': return <Code size={22} className="text-brand-600" />;
      case 'Layout': return <Layout size={22} className="text-violetAccent-600" />;
      case 'Palette': return <Palette size={22} className="text-pink-600" />;
      case 'PenTool': return <PenTool size={22} className="text-amber-600" />;
      case 'Video': return <Video size={22} className="text-rose-600" />;
      case 'Megaphone': return <Megaphone size={22} className="text-emerald-600" />;
      case 'BrainCircuit': return <BrainCircuit size={22} className="text-indigo-600" />;
      case 'Smartphone': return <Smartphone size={22} className="text-cyan-600" />;
      default: return <Code size={22} className="text-brand-600" />;
    }
  };

  const steps = [
    {
      num: "01",
      title: "Create Your Profile",
      desc: "Sign up with your college email and verify your student credentials to build credibility.",
      icon: Users
    },
    {
      num: "02",
      title: "Showcase Your Skills",
      desc: "Publish your best hackathon wins, GitHub repos, design portfolios, and fixed-price service packages.",
      icon: Award
    },
    {
      num: "03",
      title: "Find Projects or Clients",
      desc: "Connect directly with campus startups, clubs, and external recruiters looking for student talent.",
      icon: Briefcase
    },
    {
      num: "04",
      title: "Complete Work and Earn",
      desc: "Deliver high quality work and receive instant payouts protected by CampusCraft Escrow guarantee.",
      icon: TrendingUp
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-16 bg-gradient-to-b from-brand-50/50 via-white to-surface-bg border-b border-surface-border">
        {/* Decorative background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-brand-300/30 to-violetAccent-300/30 blur-3xl rounded-full pointer-events-none -z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200/80 px-3.5 py-1.5 rounded-full shadow-xs">
                <Sparkles size={14} className="text-brand-600" />
                <span className="text-xs font-bold text-brand-700">
                  The #1 Verified Marketplace for College Freelancers
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-surface-text tracking-tight leading-[1.12]">
                Turn Your Campus Skills Into <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-violetAccent-600 bg-clip-text text-transparent">Real Opportunities.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                CampusCraft is the premier student-focused freelancing marketplace. Showcase your projects, discover paid gigs from startups and clubs, and get paid safely with guaranteed escrow protection.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/freelancers"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Explore Freelancers</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/register?type=freelancer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-surface-text border border-surface-border font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <span>Start Earning</span>
                  <Sparkles size={16} className="text-brand-600" />
                </Link>
              </div>

              {/* Trust badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span>College Email Verified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-brand-600" />
                  <span>100% Escrow Protection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star size={16} className="text-amber-400 fill-amber-400" />
                  <span>4.9/5 Average Rating</span>
                </div>
              </div>
            </div>

            {/* Right Visual / Illustration Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md">
                {/* Main Glass Mockup Card */}
                <div className="bg-white rounded-3xl border border-surface-border shadow-2xl p-6 relative z-10 space-y-4">
                  {/* Top user badge */}
                  <div className="flex items-center justify-between pb-4 border-b border-surface-border">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400"
                        alt="Student"
                        className="w-12 h-12 rounded-2xl object-cover border-2 border-brand-200"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-surface-text">Arjun Mehta</h4>
                        <p className="text-xs text-brand-600 font-medium">IIT Bombay • 3rd Year CSE</p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                      +$920 this month
                    </span>
                  </div>

                  {/* Active project card */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-surface-border space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-surface-text">UniEvents Ticketing Web App</span>
                      <span className="font-bold text-brand-600">$350 Milestone</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div className="bg-brand-600 h-2 rounded-full w-4/5" />
                    </div>
                    <div className="flex justify-between text-[11px] text-surface-muted">
                      <span>Stage: Submitted for Review</span>
                      <span className="text-emerald-600 font-semibold">Escrow Funded</span>
                    </div>
                  </div>

                  {/* Skill chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['React.js', 'Next.js', 'Figma', 'Node.js', 'Tailwind'].map(skill => (
                      <span key={skill} className="text-[11px] font-semibold bg-brand-50 text-brand-700 px-2.5 py-1 rounded-lg">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Rating indicator */}
                  <div className="pt-2 flex items-center justify-between">
                    <RatingStars rating={4.9} reviewsCount={38} size={14} />
                    <span className="text-xs font-bold text-slate-500">24 Gigs Delivered</span>
                  </div>
                </div>

                {/* Floating badge 1 */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-3 border border-surface-border shadow-xl z-20 flex items-center gap-2.5 animate-bounce [animation-duration:3s]">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <p className="text-[10px] text-surface-muted font-bold uppercase">Payout Cleared</p>
                    <p className="text-xs font-extrabold text-surface-text">$240.00 to Bank</p>
                  </div>
                </div>

                {/* Floating badge 2 */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-3 border border-surface-border shadow-xl z-20 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-violetAccent-100 text-violetAccent-600 flex items-center justify-center font-bold">
                    ★
                  </div>
                  <div>
                    <p className="text-[10px] text-surface-muted font-bold uppercase">New Hire</p>
                    <p className="text-xs font-extrabold text-surface-text">Mood Indigo Tech Team</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-surface-border p-8 shadow-soft">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-surface-border">
            <div className="pt-3 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-brand-600">{platformStats.activeStudents}</p>
              <p className="text-xs sm:text-sm font-semibold text-surface-muted mt-1">Active Students</p>
            </div>
            <div className="pt-3 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-violetAccent-600">{platformStats.projectsCompleted}</p>
              <p className="text-xs sm:text-sm font-semibold text-surface-muted mt-1">Projects Completed</p>
            </div>
            <div className="pt-3 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-indigo-600">{platformStats.freelancers}</p>
              <p className="text-xs sm:text-sm font-semibold text-surface-muted mt-1">Verified Freelancers</p>
            </div>
            <div className="pt-3 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600">{platformStats.totalSkillsListed}</p>
              <p className="text-xs sm:text-sm font-semibold text-surface-muted mt-1">Specialized Skills Listed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles size={14} />
              <span>Explore by Discipline</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-surface-text">
              Popular Skill Categories
            </h2>
          </div>
          <Link
            to="/freelancers"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 group"
          >
            <span>Browse All Categories</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/freelancers?category=${encodeURIComponent(cat.name)}`)}
              className="bg-white rounded-2xl border border-surface-border p-5 hover:border-brand-400 hover:shadow-soft-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 group-hover:bg-brand-50 border border-slate-100 flex items-center justify-center mb-4 transition-colors">
                  {getCategoryIcon(cat.icon)}
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-surface-text group-hover:text-brand-600 transition-colors">
                    {cat.name}
                  </h3>
                  {cat.trending && (
                    <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                      Trending
                    </span>
                  )}
                </div>
                <p className="text-xs text-surface-muted mt-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-surface-border/60 flex items-center justify-between text-xs font-semibold text-brand-600">
                <span>{cat.count}</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How CampusCraft Works */}
      <section className="bg-slate-900 text-white py-20 rounded-3xl max-w-7xl mx-auto px-6 sm:px-10 relative overflow-hidden">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">
            Streamlined & Risk-Free
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 text-white">
            How CampusCraft Works
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            We bridge the gap between talented college builders and paying clients through guaranteed escrow protection, clear contracts, and transparent milestone tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div key={st.num} className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 relative flex flex-col justify-between">
                <div>
                  <span className="text-2xl font-black text-brand-400 block mb-3">{st.num}</span>
                  <h3 className="text-base font-bold text-white mb-2">{st.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{st.desc}</p>
                </div>
                <div className="pt-4 mt-6 border-t border-slate-700/60 flex items-center justify-end">
                  <Icon size={18} className="text-brand-400" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Student Freelancers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Award size={14} />
              <span>Campus Stars</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-surface-text">
              Featured Student Freelancers
            </h2>
          </div>
          <Link
            to="/freelancers"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 group"
          >
            <span>Explore All Freelancers</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockFreelancers.slice(0, 3).map((fl) => (
            <FreelancerCard key={fl.id} freelancer={fl} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
            Verified Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-surface-text mt-1">
            Loved by Students & Campus Founders
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-soft flex flex-col justify-between">
            <div>
              <RatingStars rating={5} size={14} showScore={false} />
              <p className="text-xs text-slate-700 mt-4 leading-relaxed italic">
                "Finding paying clients in college was a nightmare until CampusCraft. I listed my React & Tailwind services, and within two weeks had 3 campus startups hiring me with upfront escrow security."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4 mt-4 border-t border-surface-border">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                alt="Student"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-xs font-bold text-surface-text">Arjun Mehta</h4>
                <p className="text-[11px] text-surface-muted">IIT Bombay (3rd Year) • $4,200+ Earned</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-soft flex flex-col justify-between">
            <div>
              <RatingStars rating={5} size={14} showScore={false} />
              <p className="text-xs text-slate-700 mt-4 leading-relaxed italic">
                "As the convenor for our college festival, hiring student talent was so much smoother than agency quotes. The milestones and delivery agreement ensured zero delays."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4 mt-4 border-t border-surface-border">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
                alt="Client"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-xs font-bold text-surface-text">Devanshu Patel</h4>
                <p className="text-[11px] text-surface-muted">Cultural Council Lead • 7 Gigs Funded</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-soft flex flex-col justify-between">
            <div>
              <RatingStars rating={5} size={14} showScore={false} />
              <p className="text-xs text-slate-700 mt-4 leading-relaxed italic">
                "The portfolio module let me highlight my real Figma prototypes and GitHub code instead of a boring 1-page resume. Landed both freelance gigs and my summer internship here."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4 mt-4 border-t border-surface-border">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
                alt="Student"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-xs font-bold text-surface-text">Ananya Sharma</h4>
                <p className="text-[11px] text-surface-muted">BITS Pilani (4th Year) • UI/UX Designer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-600 via-indigo-600 to-violetAccent-600 rounded-3xl p-10 md:p-14 text-white text-center shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-5 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Monitize Your Skills on Campus?
            </h2>
            <p className="text-brand-100 text-sm leading-relaxed">
              Join thousands of student freelancers and collegiate clients today. Free to register with verified college credentials.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-brand-700 hover:bg-slate-50 font-bold text-sm rounded-xl shadow-md transition-all"
              >
                Create Free Account
              </Link>
              <Link
                to="/projects"
                className="w-full sm:w-auto px-8 py-3.5 bg-brand-700/60 hover:bg-brand-700 text-white font-bold text-sm rounded-xl border border-brand-400/50 transition-all"
              >
                Browse Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

