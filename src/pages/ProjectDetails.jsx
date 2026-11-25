import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Check, 
  Clock, 
  RotateCcw, 
  ShieldCheck, 
  Star, 
  GraduationCap, 
  MessageSquare, 
  Calendar, 
  AlertCircle,
  Sparkles,
  ArrowRight,
  FileText,
  Lock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import RatingStars from '../components/RatingStars';
import PricingCard from '../components/PricingCard';
import Modal from '../components/Modal';

export const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { services, reviews, createOrder, startConversationWith, showToast } = useApp();

  // Find target service
  const service = services.find((s) => s.id === id) || services[0];
  const [selectedTier, setSelectedTier] = useState('standard'); // 'basic' | 'standard' | 'premium'
  const [isAgreementModalOpen, setIsAgreementModalOpen] = useState(false);
  const [customNotes, setCustomNotes] = useState('');

  const activePackage = service?.packages?.[selectedTier] || service?.packages?.standard || {
    name: 'Package',
    price: 120,
    deliveryDays: 5,
    revisions: 3,
    description: 'Deliverables tailored to client specifications.',
    features: ['Code deliverables', 'Documentation']
  };

  const handlePackageSelect = (tierKey) => {
    setSelectedTier(tierKey);
    setIsAgreementModalOpen(true);
  };

  const handleConfirmOrder = () => {
    const deliveryDateObj = new Date();
    deliveryDateObj.setDate(deliveryDateObj.getDate() + Number(activePackage.deliveryDays));

    const newOrder = createOrder({
      serviceTitle: `${service.title} (${activePackage.name})`,
      clientName: "Campus Client (You)",
      freelancerName: service.freelancerName,
      agreedAmount: Number(activePackage.price),
      deliveryDate: deliveryDateObj.toISOString().split('T')[0],
      scope: activePackage.description + (customNotes ? ` Notes: ${customNotes}` : ''),
      revisionPolicy: `${activePackage.revisions} revisions included`,
      deliverables: activePackage.features?.join(', ')
    });

    startConversationWith(
      {
        name: service.freelancerName,
        avatar: service.freelancerAvatar,
        college: service.freelancerCollege,
        title: service.title
      },
      `Hello! I have confirmed an order for "${service.title} (${activePackage.name})" with $${activePackage.price} secured in Escrow. Let's build!`,
      service.title
    );

    setIsAgreementModalOpen(false);
    navigate('/dashboard/orders');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-surface-muted">
        <Link to="/" className="hover:text-brand-600">Home</Link>
        <span>/</span>
        <Link to="/services" className="hover:text-brand-600">Services</Link>
        <span>/</span>
        <span className="text-surface-text font-bold truncate max-w-sm">{service.title}</span>
      </div>

      {/* Main Grid: Left Details & Right Sticky Pricing */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Service Media, Description, Freelancer Profile, Agreement Safeguards, Reviews */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Service Title & Category Header */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full uppercase tracking-wider">
              {service.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-text leading-tight">
              {service.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <RatingStars rating={service.rating} reviewsCount={service.reviewsCount} size={15} />
              <span className="text-surface-muted">•</span>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <ShieldCheck size={14} />
                CampusCraft Escrow Guaranteed
              </span>
            </div>
          </div>

          {/* Banner Media */}
          <div className="rounded-3xl overflow-hidden border border-surface-border aspect-video w-full bg-slate-100 shadow-soft">
            <img
              src={service.thumbnail}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Service Description */}
          <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-soft space-y-4">
            <h3 className="font-bold text-base text-surface-text">Service Description & Scope</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Are you building a campus project, student venture, or club website? I specialize in delivering high-performance, responsive React web apps styled cleanly with Tailwind CSS. Every project follows modern engineering best practices, semantic accessibility, and clean component architecture.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Before kicking off, we freeze the scope of work and delivery milestones so there is zero ambiguity on deadlines, revisions, and deliverables.
            </p>

            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-surface-muted mb-2">
                Tags & Technologies:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {service.tags?.map((t) => (
                  <span key={t} className="text-xs font-semibold bg-brand-50 text-brand-700 px-3 py-1 rounded-xl">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Freelancer Profile Card */}
          <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-soft space-y-4">
            <h3 className="font-bold text-base text-surface-text">About the Student Freelancer</h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={service.freelancerAvatar}
                  alt={service.freelancerName}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-200"
                />
                <div>
                  <h4 className="font-bold text-base text-surface-text">{service.freelancerName}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-brand-600 font-semibold mt-0.5">
                    <GraduationCap size={14} />
                    <span>{service.freelancerCollege}</span>
                  </div>
                  <RatingStars rating={service.rating} reviewsCount={service.reviewsCount} size={13} />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => startConversationWith(
                    { name: service.freelancerName, avatar: service.freelancerAvatar, college: service.freelancerCollege },
                    "Hi! I'm interested in discussing custom requirements for your service."
                  )}
                  className="px-4 py-2 rounded-xl border border-surface-border hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare size={14} />
                  <span>Send Message</span>
                </button>
              </div>
            </div>
          </div>

          {/* Three Packages Comparison Table */}
          <div className="space-y-4">
            <h3 className="font-bold text-base text-surface-text">Compare Package Tiers</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['basic', 'standard', 'premium'].map((tierKey) => {
                const pkg = service.packages?.[tierKey];
                if (!pkg) return null;
                return (
                  <PricingCard
                    key={tierKey}
                    tier={tierKey}
                    pkg={pkg}
                    selected={selectedTier === tierKey}
                    isPopular={tierKey === 'standard'}
                    onSelect={() => handlePackageSelect(tierKey)}
                  />
                );
              })}
            </div>
          </div>

          {/* Client Reviews Section */}
          <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-surface-text">Verified Client Reviews</h3>
              <RatingStars rating={service.rating} reviewsCount={reviews.length} size={15} />
            </div>

            <div className="space-y-4 pt-2">
              {reviews.slice(0, 2).map((rev) => (
                <div key={rev.id} className="p-4 bg-slate-50/70 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={rev.clientAvatar}
                        alt={rev.clientName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <span className="text-xs font-bold text-surface-text block">{rev.clientName}</span>
                        <span className="text-[10px] text-surface-muted">{rev.clientCollege} • {rev.date}</span>
                      </div>
                    </div>
                    <RatingStars rating={rev.rating} size={12} showScore={false} />
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sticky Sidebar (4 cols): Order Agreement Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-surface-border p-6 shadow-soft-lg sticky top-24 space-y-6">
            
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-surface-muted">Selected Tier</span>
                <span className="text-xs font-bold text-brand-600 uppercase bg-brand-50 px-2 py-0.5 rounded">
                  {selectedTier}
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-surface-text">${activePackage.price}</span>
                <span className="text-xs text-surface-muted font-bold">USD</span>
              </div>
              <p className="text-xs font-bold text-surface-text mt-1">{activePackage.name}</p>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{activePackage.description}</p>
            </div>

            {/* Turnaround & Revisions */}
            <div className="grid grid-cols-2 gap-2 text-xs py-3 border-y border-surface-border bg-slate-50/60 rounded-xl px-3">
              <div className="flex items-center gap-1.5 text-surface-muted">
                <Clock size={15} className="text-brand-600" />
                <span><strong>{activePackage.deliveryDays}</strong> Days Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 text-surface-muted">
                <RotateCcw size={15} className="text-violetAccent-600" />
                <span><strong>{activePackage.revisions}</strong> Revisions</span>
              </div>
            </div>

            {/* Inclusions */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-surface-muted block">
                Deliverables Included:
              </span>
              {activePackage.features?.map((ft, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                  <Check size={14} className="text-emerald-500 stroke-[3]" />
                  <span>{ft}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => setIsAgreementModalOpen(true)}
              className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Review Agreement & Hire (${activePackage.price})</span>
              <ArrowRight size={15} />
            </button>

            {/* Escrow Trust Safeguard Notice */}
            <div className="p-3.5 rounded-2xl bg-brand-50/60 border border-brand-100 space-y-1.5 text-xs text-brand-900">
              <div className="flex items-center gap-1.5 font-bold text-brand-800">
                <ShieldCheck size={16} className="text-brand-600" />
                <span>CampusCraft Escrow Protection</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-600">
                Your payment is safely reserved in escrow and only transferred to the student after you verify and approve the work.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* MODAL: Agreement Summary Before Order Confirmation */}
      <Modal
        isOpen={isAgreementModalOpen}
        onClose={() => setIsAgreementModalOpen(false)}
        title="Project & Escrow Agreement Summary"
        maxWidth="max-w-xl"
      >
        <div className="space-y-5">
          <div className="p-3.5 bg-slate-50 border border-surface-border rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-surface-muted">Service & Package</span>
              <h4 className="font-bold text-xs text-surface-text">{service.title} ({activePackage.name})</h4>
              <p className="text-[11px] text-brand-600 font-semibold">{service.freelancerName} • {service.freelancerCollege}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-brand-600">${activePackage.price}</span>
              <span className="text-[10px] text-surface-muted block font-semibold">Escrow Funded</span>
            </div>
          </div>

          {/* 6 Core Agreement Clauses */}
          <div className="space-y-3 bg-white border border-surface-border rounded-2xl p-4 text-xs divide-y divide-surface-border">
            <div className="flex items-center justify-between pb-2">
              <span className="text-surface-muted font-medium">Agreed Price</span>
              <span className="font-bold text-surface-text">${activePackage.price} USD</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-surface-muted font-medium">Delivery Deadline</span>
              <span className="font-bold text-surface-text">{activePackage.deliveryDays} Days from Kickoff</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-surface-muted font-medium">Revision Policy</span>
              <span className="font-bold text-surface-text">{activePackage.revisions} Revisions Included</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-surface-muted font-medium">Required Deliverables</span>
              <span className="font-bold text-surface-text">{activePackage.features?.length} Items Defined</span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-surface-muted font-medium">Payment & Dispute Status</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <Lock size={12} />
                Secured in Escrow
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
              Add Specific Project Notes / Deliverable Links (Optional)
            </label>
            <textarea
              rows={2}
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="e.g. Please integrate with our student club logo and branding colors..."
              className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
            />
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-snug">
            <strong>Transparency Notice:</strong> Confirming creates an active order with interactive milestone tracking (Stage 1: Order Confirmed) and starts your direct chat with the student freelancer.
          </div>

          <div className="pt-2 border-t border-surface-border flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAgreementModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-surface-border text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmOrder}
              className="px-6 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 shadow-sm flex items-center gap-1.5"
            >
              <Check size={14} />
              <span>Confirm Order & Fund Escrow (${activePackage.price})</span>
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default ProjectDetails;

