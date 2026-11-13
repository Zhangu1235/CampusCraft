import React, { useState } from 'react';
import { Star, ShieldCheck, MessageSquare, Plus, Award, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import RatingStars from '../components/RatingStars';
import Modal from '../components/Modal';

export const ReviewsPage = () => {
  const { reviews, addReview, currentUser } = useApp();
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);

  const [reviewForm, setReviewForm] = useState({
    clientName: 'Siddharth Rao',
    clientRole: 'Vice President, Robotics Society',
    clientCollege: 'IIT Bombay',
    clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    rating: 5,
    projectTitle: 'Automated Sensor Dashboard',
    comment: '',
    tags: 'Fast Delivery, High Quality'
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewForm.comment.trim()) return;

    addReview({
      clientName: reviewForm.clientName,
      clientRole: reviewForm.clientRole,
      clientCollege: reviewForm.clientCollege,
      clientAvatar: reviewForm.clientAvatar,
      rating: Number(reviewForm.rating),
      projectTitle: reviewForm.projectTitle,
      comment: reviewForm.comment,
      tags: reviewForm.tags.split(',').map(t => t.trim()).filter(Boolean)
    });

    setIsAddReviewModalOpen(false);
  };

  const totalReviews = reviews.length;
  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1);

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-600 via-indigo-600 to-violetAccent-600 rounded-3xl p-8 text-white shadow-soft relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-white/15 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
              <Star size={14} className="text-amber-300 fill-amber-300" />
              <span>Reputation & Trust Service</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Verified Client Reviews & Ratings
            </h1>
            <p className="text-xs sm:text-sm text-brand-100 max-w-xl leading-relaxed">
              Every review on CampusCraft is backed by completed escrow orders. No fake ratings, ensuring genuine transparency between students and clients.
            </p>
          </div>

          <button
            onClick={() => setIsAddReviewModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-white text-brand-700 hover:bg-brand-50 font-bold text-xs shadow-md transition-all flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus size={16} />
            <span>Leave Client Feedback</span>
          </button>
        </div>
      </div>

      {/* Ratings Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Rating Score Card */}
        <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-soft flex flex-col justify-center items-center text-center">
          <span className="text-5xl font-black text-surface-text">{avgRating}</span>
          <div className="my-2">
            <RatingStars rating={Number(avgRating)} size={20} showScore={false} />
          </div>
          <span className="text-xs text-surface-muted font-bold">
            Based on {totalReviews} verified project deliveries
          </span>
        </div>

        {/* Breakdown bars */}
        <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-soft space-y-2.5 md:col-span-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-surface-muted mb-3">
            Satisfaction Breakdown
          </h4>
          {[
            { stars: '5 Stars', pct: '92%', count: 35 },
            { stars: '4 Stars', pct: '8%', count: 3 },
            { stars: '3 Stars', pct: '0%', count: 0 },
            { stars: '2 Stars', pct: '0%', count: 0 },
            { stars: '1 Star', pct: '0%', count: 0 },
          ].map((bar) => (
            <div key={bar.stars} className="flex items-center gap-3 text-xs">
              <span className="w-16 text-slate-600 font-semibold">{bar.stars}</span>
              <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-amber-400 h-2 rounded-full" style={{ width: bar.pct }} />
              </div>
              <span className="w-8 text-right text-surface-muted text-[11px]">{bar.count}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Reviews Grid */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-surface-text">
          Recent Feedback ({reviews.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-surface-border p-6 shadow-soft flex flex-col justify-between space-y-4 hover:border-brand-300 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.clientAvatar}
                      alt={rev.clientName}
                      className="w-11 h-11 rounded-2xl object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-surface-text">{rev.clientName}</h4>
                      <p className="text-[11px] text-brand-600 font-medium">{rev.clientRole}</p>
                      <p className="text-[10px] text-surface-muted">{rev.clientCollege}</p>
                    </div>
                  </div>
                  <RatingStars rating={rev.rating} size={14} showScore={false} />
                </div>

                {rev.projectTitle && (
                  <div className="inline-block bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                    Gig: {rev.projectTitle}
                  </div>
                )}

                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>

                {rev.tags && rev.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {rev.tags.map((t) => (
                      <span key={t} className="text-[10px] bg-brand-50 text-brand-700 px-2 py-0.5 rounded-md font-semibold">
                        ✓ {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-surface-border flex items-center justify-between text-[11px] text-surface-muted">
                <span>{rev.date}</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  Verified Escrow Completion
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leave Review Modal */}
      <Modal
        isOpen={isAddReviewModalOpen}
        onClose={() => setIsAddReviewModalOpen(false)}
        title="Leave Verified Feedback"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
                Your Name / Organization
              </label>
              <input
                type="text"
                value={reviewForm.clientName}
                onChange={(e) => setReviewForm({ ...reviewForm, clientName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
                Star Rating
              </label>
              <select
                value={reviewForm.rating}
                onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 font-bold"
              >
                <option value={5}>⭐⭐⭐⭐⭐ 5 Stars - Exceptional</option>
                <option value={4}>⭐⭐⭐⭐ 4 Stars - Very Good</option>
                <option value={3}>⭐⭐⭐ 3 Stars - Average</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
              Project / Gig Title
            </label>
            <input
              type="text"
              value={reviewForm.projectTitle}
              onChange={(e) => setReviewForm({ ...reviewForm, projectTitle: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
              Written Review *
            </label>
            <textarea
              rows={3}
              value={reviewForm.comment}
              onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
              required
              placeholder="Highlight communication, timeliness, code quality, and responsiveness..."
              className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
              Positive Tags (Comma separated)
            </label>
            <input
              type="text"
              value={reviewForm.tags}
              onChange={(e) => setReviewForm({ ...reviewForm, tags: e.target.value })}
              placeholder="On-time Delivery, Clean Code, Great Communication"
              className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
            />
          </div>

          <div className="pt-2 border-t border-surface-border flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddReviewModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-surface-border text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 shadow-sm"
            >
              Post Review
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default ReviewsPage;

