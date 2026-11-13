import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  MapPin, 
  Sparkles, 
  Briefcase, 
  Star, 
  CheckCircle2, 
  Github, 
  Linkedin, 
  Globe, 
  ShieldCheck,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import RatingStars from '../components/RatingStars';
import SkillBadge from '../components/SkillBadge';
import StudentProfile from './StudentProfile';

export const PublicProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { freelancers, currentUser, startConversationWith } = useApp();

  // If viewing own profile id or no id, delegate to StudentProfile
  if (!id || id === currentUser.id) {
    return <StudentProfile />;
  }

  const freelancer = freelancers.find((f) => f.id === id);

  if (!freelancer) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-surface-text">Freelancer Profile Not Found</h2>
        <button
          onClick={() => navigate('/freelancers')}
          className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold"
        >
          Back to Freelancers Directory
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-brand-600 transition-colors"
      >
        <ArrowLeft size={14} />
        <span>Back to Directory</span>
      </button>

      {/* Main Profile Header Banner */}
      <div className="bg-white rounded-3xl border border-surface-border overflow-hidden shadow-soft">
        <div className="h-44 md:h-52 w-full bg-gradient-to-r from-brand-600 via-indigo-600 to-violetAccent-600 relative">
          <div className="absolute top-4 right-4 bg-white/90 text-surface-text text-xs font-bold px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm flex items-center gap-1">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>Verified Student Creator</span>
          </div>
        </div>

        <div className="px-6 md:px-8 pb-8 pt-0 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-16 md:-mt-20 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              <div className="relative">
                <img
                  src={freelancer.avatar}
                  alt={freelancer.name}
                  className="w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover border-4 border-white shadow-lg bg-white"
                />
                <span className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-surface-text">
                    {freelancer.name}
                  </h1>
                  {freelancer.badge && (
                    <span className="inline-flex items-center gap-1 bg-brand-50 text-brand-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-brand-200">
                      <Sparkles size={11} />
                      {freelancer.badge}
                    </span>
                  )}
                </div>

                <p className="text-sm font-semibold text-brand-600">
                  {freelancer.title}
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-surface-muted pt-0.5">
                  <div className="flex items-center gap-1">
                    <GraduationCap size={14} className="text-slate-400" />
                    <span>{freelancer.college}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-slate-700">{freelancer.course}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Hire / Message */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => startConversationWith(freelancer, "Hi! I would like to discuss a project with you.")}
                className="px-4 py-2.5 rounded-xl border border-surface-border bg-white text-xs font-bold text-surface-text hover:bg-slate-50 transition-colors"
              >
                Send Message
              </button>
              <button
                onClick={() => navigate(`/freelancers?hire=${freelancer.id}`)}
                className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                <Briefcase size={14} />
                <span>Hire {freelancer.name.split(' ')[0]} (From ${freelancer.startingPrice})</span>
              </button>
            </div>
          </div>

          <p className="text-sm text-slate-700 max-w-4xl leading-relaxed mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            {freelancer.bio}
          </p>

          <div className="flex flex-wrap items-center gap-8 text-xs border-t border-surface-border/70 pt-4">
            <div>
              <RatingStars rating={freelancer.rating} reviewsCount={freelancer.reviewsCount} size={15} />
              <span className="text-[11px] text-surface-muted block mt-0.5">Client Feedback</span>
            </div>
            <div>
              <span className="text-sm font-bold text-surface-text block">${freelancer.startingPrice}</span>
              <span className="text-[11px] text-surface-muted block mt-0.5">Starting Gig Price</span>
            </div>
            <div>
              <span className="text-sm font-bold text-surface-text block">${freelancer.hourlyRate}/hr</span>
              <span className="text-[11px] text-surface-muted block mt-0.5">Estimated Hourly Rate</span>
            </div>
            <div>
              <span className="text-sm font-bold text-emerald-600 block">{freelancer.completedProjects} Projects</span>
              <span className="text-[11px] text-surface-muted block mt-0.5">Delivered on CampusCraft</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Showcase */}
      <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-soft space-y-3">
        <h3 className="font-bold text-sm text-surface-text uppercase tracking-wider text-surface-muted">
          Core Technologies & Verified Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {freelancer.skills.map((skill) => (
            <SkillBadge key={typeof skill === 'string' ? skill : skill.name} skill={skill} size="lg" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;

