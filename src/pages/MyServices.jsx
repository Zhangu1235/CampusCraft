import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Plus, Briefcase, Sparkles, Check, Clock, RotateCcw, Eye, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/mockData';
import ServiceCard from '../components/ServiceCard';
import Modal from '../components/Modal';

export const MyServices = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { services, createService, currentUser } = useApp();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'my'

  // Service Creation Form State
  const [serviceForm, setServiceForm] = useState({
    title: '',
    category: 'Web Development',
    tags: 'React, Tailwind, Responsive',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
    packages: {
      basic: {
        name: 'Starter Tier',
        price: 50,
        deliveryDays: 3,
        revisions: 2,
        description: 'Single landing page layout with mobile responsive styles.',
        features: '1 Responsive Page\nTailwind Styling\nSource Code'
      },
      standard: {
        name: 'Standard Tier',
        price: 120,
        deliveryDays: 6,
        revisions: 4,
        description: 'Multi-page application with API integration and interactive state.',
        features: 'Up to 5 Pages\nAPI Integration\nDeployment on Vercel\n4 Revisions'
      },
      premium: {
        name: 'Complete Full-Stack MVP',
        price: 280,
        deliveryDays: 14,
        revisions: 'Unlimited',
        description: 'Full-stack platform with authentication, database, and admin controls.',
        features: 'Full Web App MVP\nAuth & Database\nAdmin Dashboard\nUnlimited Revisions\n30 Days Support'
      }
    }
  });

  useEffect(() => {
    if (searchParams.get('action') === 'create') {
      setIsCreateModalOpen(true);
      setSearchParams({});
    }
  }, [searchParams]);

  const handlePackageChange = (tier, field, value) => {
    setServiceForm(prev => ({
      ...prev,
      packages: {
        ...prev.packages,
        [tier]: {
          ...prev.packages[tier],
          [field]: value
        }
      }
    }));
  };

  const handleCreateServiceSubmit = (e) => {
    e.preventDefault();
    if (!serviceForm.title.trim()) return;

    // Convert feature strings to array
    const formattedPackages = {
      basic: {
        ...serviceForm.packages.basic,
        price: Number(serviceForm.packages.basic.price),
        deliveryDays: Number(serviceForm.packages.basic.deliveryDays),
        features: serviceForm.packages.basic.features.split('\n').filter(Boolean)
      },
      standard: {
        ...serviceForm.packages.standard,
        price: Number(serviceForm.packages.standard.price),
        deliveryDays: Number(serviceForm.packages.standard.deliveryDays),
        features: serviceForm.packages.standard.features.split('\n').filter(Boolean)
      },
      premium: {
        ...serviceForm.packages.premium,
        price: Number(serviceForm.packages.premium.price),
        deliveryDays: Number(serviceForm.packages.premium.deliveryDays),
        features: serviceForm.packages.premium.features.split('\n').filter(Boolean)
      }
    };

    const newService = createService({
      title: serviceForm.title,
      category: serviceForm.category,
      thumbnail: serviceForm.thumbnail,
      tags: serviceForm.tags.split(',').map(t => t.trim()).filter(Boolean),
      startingPrice: Number(serviceForm.packages.basic.price),
      packages: formattedPackages
    });

    setIsCreateModalOpen(false);
  };

  const myServices = services.filter(s => s.freelancerId === currentUser.id || s.freelancerName === currentUser.name);
  const displayedServices = activeTab === 'my' ? myServices : services;

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-600 via-indigo-600 to-violetAccent-600 rounded-3xl p-8 text-white shadow-soft relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-white/15 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
              <Briefcase size={14} className="text-amber-300" />
              <span>Service Catalog & Offerings</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Pre-Packaged Freelance Services
            </h1>
            <p className="text-xs sm:text-sm text-brand-100 max-w-xl leading-relaxed">
              Transparent, fixed-price student services with clear deliverables across Basic, Standard, and Premium tiers.
            </p>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-white text-brand-700 hover:bg-brand-50 font-bold text-xs shadow-md transition-all flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus size={16} />
            <span>Create a Service Listing</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-surface-border pb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-surface-muted hover:text-surface-text hover:bg-slate-100'
            }`}
          >
            Marketplace Catalog ({services.length})
          </button>
          <button
            onClick={() => setActiveTab('my')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'my'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-surface-muted hover:text-surface-text hover:bg-slate-100'
            }`}
          >
            My Published Services ({myServices.length})
          </button>
        </div>

        <span className="text-xs text-surface-muted hidden sm:inline font-medium">
          Showing {displayedServices.length} active service packages
        </span>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onSelect={() => navigate(`/services/${service.id}`)}
          />
        ))}
      </div>

      {displayedServices.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8 space-y-3">
          <Briefcase size={40} className="mx-auto text-slate-300" />
          <h3 className="font-bold text-surface-text text-base">No services found</h3>
          <p className="text-xs text-surface-muted max-w-sm mx-auto">
            You haven't published any freelance service listings yet. Create your first listing to receive fixed-price orders!
          </p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold"
          >
            Create Your First Service
          </button>
        </div>
      )}

      {/* Service Creation Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Publish a New Freelance Service"
        maxWidth="max-w-3xl"
      >
        <form onSubmit={handleCreateServiceSubmit} className="space-y-6">
          
          {/* Basic Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-600 pb-1 border-b border-surface-border">
              1. General Information
            </h4>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
                Service Title * (What will you do?)
              </label>
              <input
                type="text"
                value={serviceForm.title}
                onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                required
                placeholder="e.g. I will build a responsive React & Tailwind landing page"
                className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
                  Category
                </label>
                <select
                  value={serviceForm.category}
                  onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
                  Tags / Required Skills
                </label>
                <input
                  type="text"
                  value={serviceForm.tags}
                  onChange={(e) => setServiceForm({ ...serviceForm, tags: e.target.value })}
                  placeholder="React, Tailwind, Responsive"
                  className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
                Service Cover Image URL
              </label>
              <input
                type="url"
                value={serviceForm.thumbnail}
                onChange={(e) => setServiceForm({ ...serviceForm, thumbnail: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
              />
            </div>
          </div>

          {/* 3 Pricing Packages */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-600 pb-1 border-b border-surface-border">
              2. Three Pricing Packages (Basic, Standard, Premium)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Basic Tier */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-surface-border space-y-3">
                <span className="text-xs font-extrabold text-surface-text uppercase tracking-wider block">
                  🟢 Basic Package
                </span>
                <div>
                  <label className="text-[10px] uppercase font-bold text-surface-muted block mb-1">Package Name</label>
                  <input
                    type="text"
                    value={serviceForm.packages.basic.name}
                    onChange={(e) => handlePackageChange('basic', 'name', e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-surface-border rounded-lg text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-surface-muted block mb-1">Price ($)</label>
                    <input
                      type="number"
                      value={serviceForm.packages.basic.price}
                      onChange={(e) => handlePackageChange('basic', 'price', e.target.value)}
                      className="w-full px-2 py-1.5 bg-white border border-surface-border rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-surface-muted block mb-1">Days</label>
                    <input
                      type="number"
                      value={serviceForm.packages.basic.deliveryDays}
                      onChange={(e) => handlePackageChange('basic', 'deliveryDays', e.target.value)}
                      className="w-full px-2 py-1.5 bg-white border border-surface-border rounded-lg text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-surface-muted block mb-1">Features (1 per line)</label>
                  <textarea
                    rows={3}
                    value={serviceForm.packages.basic.features}
                    onChange={(e) => handlePackageChange('basic', 'features', e.target.value)}
                    className="w-full px-2 py-1.5 bg-white border border-surface-border rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              {/* Standard Tier */}
              <div className="p-4 bg-brand-50/40 rounded-2xl border border-brand-200 space-y-3">
                <span className="text-xs font-extrabold text-brand-700 uppercase tracking-wider block">
                  ⚡ Standard Package (Popular)
                </span>
                <div>
                  <label className="text-[10px] uppercase font-bold text-surface-muted block mb-1">Package Name</label>
                  <input
                    type="text"
                    value={serviceForm.packages.standard.name}
                    onChange={(e) => handlePackageChange('standard', 'name', e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-brand-200 rounded-lg text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-surface-muted block mb-1">Price ($)</label>
                    <input
                      type="number"
                      value={serviceForm.packages.standard.price}
                      onChange={(e) => handlePackageChange('standard', 'price', e.target.value)}
                      className="w-full px-2 py-1.5 bg-white border border-brand-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-surface-muted block mb-1">Days</label>
                    <input
                      type="number"
                      value={serviceForm.packages.standard.deliveryDays}
                      onChange={(e) => handlePackageChange('standard', 'deliveryDays', e.target.value)}
                      className="w-full px-2 py-1.5 bg-white border border-brand-200 rounded-lg text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-surface-muted block mb-1">Features (1 per line)</label>
                  <textarea
                    rows={3}
                    value={serviceForm.packages.standard.features}
                    onChange={(e) => handlePackageChange('standard', 'features', e.target.value)}
                    className="w-full px-2 py-1.5 bg-white border border-brand-200 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              {/* Premium Tier */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-surface-border space-y-3">
                <span className="text-xs font-extrabold text-violetAccent-700 uppercase tracking-wider block">
                  👑 Premium Package
                </span>
                <div>
                  <label className="text-[10px] uppercase font-bold text-surface-muted block mb-1">Package Name</label>
                  <input
                    type="text"
                    value={serviceForm.packages.premium.name}
                    onChange={(e) => handlePackageChange('premium', 'name', e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-surface-border rounded-lg text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-surface-muted block mb-1">Price ($)</label>
                    <input
                      type="number"
                      value={serviceForm.packages.premium.price}
                      onChange={(e) => handlePackageChange('premium', 'price', e.target.value)}
                      className="w-full px-2 py-1.5 bg-white border border-surface-border rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-surface-muted block mb-1">Days</label>
                    <input
                      type="number"
                      value={serviceForm.packages.premium.deliveryDays}
                      onChange={(e) => handlePackageChange('premium', 'deliveryDays', e.target.value)}
                      className="w-full px-2 py-1.5 bg-white border border-surface-border rounded-lg text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-surface-muted block mb-1">Features (1 per line)</label>
                  <textarea
                    rows={3}
                    value={serviceForm.packages.premium.features}
                    onChange={(e) => handlePackageChange('premium', 'features', e.target.value)}
                    className="w-full px-2 py-1.5 bg-white border border-surface-border rounded-lg text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-surface-border flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-surface-border text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 shadow-sm"
            >
              Publish Service to Marketplace
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default MyServices;

