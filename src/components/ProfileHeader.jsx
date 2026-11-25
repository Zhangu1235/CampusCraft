import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Github, 
  Linkedin, 
  Globe, 
  Twitter, 
  Edit, 
  Plus, 
  Share2, 
  CheckCircle,
  Eye,
  Sparkles
} from 'lucide-react';
import RatingStars from './RatingStars';
import SkillBadge from './SkillBadge';

export const ProfileHeader = ({
  user,
  onEditProfile = null,
  onAddSkill = null,
  onAddProject = null,
  isPublicView = false,
  onTogglePublicView = null
}) => {
  return (
    <div className="bg-white rounded-2xl border border-surface-border overflow-hidden shadow-soft mb-8">
      {/* Cover Banner */}
      <div className="h-44 md:h-52 w-full relative bg-gradient-to-r from-brand-600 via-indigo-600 to-violetAccent-600">
        <img
          src={user.coverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80"}
          alt="Profile cover"
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
        />
        
        {/* Toggle Public Preview Pill */}
        {onTogglePublicView && (
          <button
            onClick={onTogglePublicView}
            className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-surface-text text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-md backdrop-blur-sm transition-all flex items-center gap-1.5"
          >
            <Eye size={14} className="text-brand-600" />
            <span>{isPublicView ? "Exit Public Preview" : "Public Preview"}</span>
          </button>
        )}
      </div>

      {/* Profile Details Bar */}
      <div className="px-6 md:px-8 pb-8 pt-0 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-16 md:-mt-20 mb-6">
          {/* Avatar & Main Identity */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover border-4 border-white shadow-lg bg-white"
              />
              <span className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" title="Online" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-extrabold text-surface-text">
                  {user.name}
                </h1>
                <span className="inline-flex items-center gap-1 bg-brand-50 text-brand-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-brand-200">
                  <Sparkles size={11} />
                  {user.role || "Student Freelancer"}
                </span>
              </div>

              <p className="text-sm font-semibold text-brand-600">
                {user.title}
              </p>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-surface-muted pt-0.5">
                <div className="flex items-center gap-1.5">
                  <GraduationCap size={14} className="text-slate-400" />
                  <span>{user.college}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-slate-700">{user.course}</span>
                  <span>({user.year})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-slate-400" />
                  <span>{user.location || "Mumbai, India"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons (Edit Profile, Add project, etc.) */}
          {!isPublicView && (
            <div className="flex flex-wrap items-center gap-2.5">
              {onAddSkill && (
                <button
                  onClick={onAddSkill}
                  className="px-3.5 py-2 rounded-xl border border-surface-border bg-white text-xs font-bold text-surface-text hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Plus size={14} />
                  <span>Add Skill</span>
                </button>
              )}
              {onAddProject && (
                <button
                  onClick={onAddProject}
                  className="px-3.5 py-2 rounded-xl bg-violetAccent-600 hover:bg-violetAccent-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Plus size={14} />
                  <span>Add Project</span>
                </button>
              )}
              {onEditProfile && (
                <button
                  onClick={onEditProfile}
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Edit size={14} />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Bio */}
        <p className="text-sm text-slate-700 max-w-4xl leading-relaxed mb-6 bg-slate-50/60 p-4 rounded-xl border border-slate-100">
          {user.bio}
        </p>

        {/* Stats, Social links & Profile Completion Indicator */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Rating & Response Stats */}
          <div className="flex items-center gap-6 text-xs border-r border-surface-border/60 pr-4">
            <div>
              <RatingStars rating={user.rating} reviewsCount={user.reviewsCount} size={15} />
              <span className="text-[11px] text-surface-muted block mt-1">Client Satisfaction</span>
            </div>
            <div className="border-l border-surface-border pl-6">
              <span className="text-sm font-bold text-surface-text block">${user.hourlyRate}/hr</span>
              <span className="text-[11px] text-surface-muted">Starting: ${user.startingPrice}</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {user.socialLinks?.github && (
              <a
                href={user.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                title="GitHub"
              >
                <Github size={16} />
              </a>
            )}
            {user.socialLinks?.linkedin && (
              <a
                href={user.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            )}
            {user.socialLinks?.portfolio && (
              <a
                href={user.socialLinks.portfolio}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                title="Personal Website"
              >
                <Globe size={16} />
              </a>
            )}
            {user.socialLinks?.twitter && (
              <a
                href={user.socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                title="Twitter / X"
              >
                <Twitter size={16} />
              </a>
            )}
          </div>

          {/* Profile Completion Indicator */}
          {!isPublicView && (
            <div className="bg-brand-50/70 border border-brand-100 p-3.5 rounded-xl">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-brand-900">Profile Strength</span>
                <span className="text-brand-600">{user.profileCompletion || 92}%</span>
              </div>
              <div className="w-full bg-brand-200/60 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-brand-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${user.profileCompletion || 92}%` }}
                />
              </div>
              <p className="text-[10px] text-brand-700 mt-1 font-medium">
                Add 1 more certificate to reach 100% All-Star status!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;

