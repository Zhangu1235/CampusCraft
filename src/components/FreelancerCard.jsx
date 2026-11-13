import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, GraduationCap, Sparkles, MessageSquare, Briefcase } from 'lucide-react';
import RatingStars from './RatingStars';
import SkillBadge from './SkillBadge';

export const FreelancerCard = ({ freelancer, onHire = null }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-surface-border p-5 hover:border-brand-300 hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Top Header */}
        <div className="flex items-start gap-3.5 mb-3.5">
          <div className="relative">
            <img
              src={freelancer.avatar}
              alt={freelancer.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-brand-100 group-hover:border-brand-500 transition-colors"
            />
            {freelancer.isAvailable !== false && (
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" title="Available for work" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-surface-text text-base truncate group-hover:text-brand-600 transition-colors">
                {freelancer.name}
              </h4>
              {freelancer.badge && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                  <Sparkles size={11} />
                  {freelancer.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-brand-600 font-medium truncate mt-0.5">
              {freelancer.title}
            </p>
            <div className="flex items-center gap-1 text-[11px] text-surface-muted mt-1 truncate">
              <GraduationCap size={13} className="shrink-0 text-slate-400" />
              <span className="truncate">{freelancer.college}</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-3.5 leading-relaxed">
          {freelancer.bio}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {freelancer.skills.slice(0, 4).map((skill) => (
            <SkillBadge key={typeof skill === 'string' ? skill : skill.name} skill={skill} size="sm" />
          ))}
          {freelancer.skills.length > 4 && (
            <span className="text-[11px] text-surface-muted self-center font-medium pl-1">
              +{freelancer.skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Rating, Starting Price & Actions */}
      <div className="pt-3.5 border-t border-surface-border">
        <div className="flex items-center justify-between mb-3.5">
          <RatingStars rating={freelancer.rating} reviewsCount={freelancer.reviewsCount} size={14} />
          <div className="text-right">
            <span className="text-[10px] text-surface-muted block uppercase tracking-wider font-semibold">Starting at</span>
            <span className="text-base font-extrabold text-surface-text">
              ${freelancer.startingPrice}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => navigate(`/profile/${freelancer.id}`)}
            className="w-full py-2 px-3 rounded-xl border border-surface-border text-xs font-semibold text-surface-text hover:bg-slate-50 hover:border-slate-300 transition-colors text-center"
          >
            View Profile
          </button>
          <button
            onClick={() => onHire ? onHire(freelancer) : navigate(`/hire/${freelancer.id}`)}
            className="w-full py-2 px-3 rounded-xl bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700 shadow-sm transition-all text-center flex items-center justify-center gap-1"
          >
            <Briefcase size={13} />
            <span>Hire Me</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreelancerCard;

