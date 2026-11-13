import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import RatingStars from './RatingStars';

export const ServiceCard = ({ service, onSelect = null }) => {
  const navigate = useNavigate();
  const basicPkg = service.packages?.basic || {};

  return (
    <div className="bg-white rounded-2xl border border-surface-border overflow-hidden hover:border-brand-300 hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Thumbnail */}
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
          <img
            src={service.thumbnail}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className="text-[11px] font-bold text-surface-text bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm">
              {service.category}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          {/* Freelancer info */}
          <div className="flex items-center gap-2.5 mb-3">
            <img
              src={service.freelancerAvatar}
              alt={service.freelancerName}
              className="w-7 h-7 rounded-full object-cover border border-slate-200"
            />
            <div className="min-w-0">
              <span className="text-xs font-semibold text-surface-text block truncate">
                {service.freelancerName}
              </span>
              <span className="text-[10px] text-surface-muted block truncate">
                {service.freelancerCollege}
              </span>
            </div>
          </div>

          {/* Title */}
          <h4 
            onClick={() => navigate(`/services/${service.id}`)}
            className="font-bold text-surface-text text-sm group-hover:text-brand-600 transition-colors line-clamp-2 cursor-pointer mb-2.5"
          >
            {service.title}
          </h4>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {service.tags?.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                #{tag}
              </span>
            ))}
          </div>

          <RatingStars rating={service.rating} reviewsCount={service.reviewsCount} size={13} />
        </div>
      </div>

      {/* Card Footer: Starting Price & Details link */}
      <div className="px-5 py-3.5 bg-slate-50/70 border-t border-surface-border flex items-center justify-between">
        <div>
          <span className="text-[10px] text-surface-muted block uppercase tracking-wider font-semibold">Starting at</span>
          <span className="text-base font-extrabold text-brand-600">
            ${service.startingPrice || basicPkg.price || 50}
          </span>
        </div>

        <button
          onClick={() => onSelect ? onSelect(service) : navigate(`/services/${service.id}`)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700 bg-white border border-brand-200/80 hover:border-brand-300 px-3 py-1.5 rounded-xl shadow-xs transition-colors"
        >
          <span>View Packages</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;

