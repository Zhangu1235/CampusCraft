import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Layers, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  DollarSign, 
  Calendar, 
  FileText, 
  ChevronRight,
  MessageSquare,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProjectProgressTracker, { stages } from '../components/ProjectProgressTracker';
import Modal from '../components/Modal';

export const OrdersPage = () => {
  const navigate = useNavigate();
  const { orders, updateOrderStatus, startConversationWith } = useApp();

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'active' | 'review' | 'completed'
  const [selectedOrder, setSelectedOrder] = useState(orders[0] || null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [targetStage, setTargetStage] = useState(2);
  const [updateNote, setUpdateNote] = useState('');

  const filteredOrders = orders.filter((o) => {
    if (activeTab === 'active') return o.stage === 1 || o.stage === 2;
    if (activeTab === 'review') return o.stage === 3 || o.stage === 4;
    if (activeTab === 'completed') return o.stage === 5;
    return true; // 'all'
  });

  const handleStageNodeClick = (order, stageId) => {
    setSelectedOrder(order);
    setTargetStage(stageId);
    setUpdateNote(`Updating status to ${stages.find(s => s.id === stageId)?.name}`);
    setIsUpdateModalOpen(true);
  };

  const handleConfirmStageUpdate = (e) => {
    e.preventDefault();
    if (!selectedOrder) return;
    updateOrderStatus(selectedOrder.id, targetStage, updateNote);
    setIsUpdateModalOpen(false);
    // Refresh selected order reference
    const updated = orders.find(o => o.id === selectedOrder.id);
    if (updated) setSelectedOrder(updated);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-surface-text">
            Orders & Milestone Tracking
          </h1>
          <p className="text-xs text-surface-muted mt-0.5">
            Transparent milestone management with guaranteed CampusCraft Escrow protection
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-700 flex items-center gap-1.5">
            <ShieldCheck size={16} />
            <span>Escrow Protected Platform</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-surface-border pb-3">
        {[
          { key: 'all', label: `All Orders (${orders.length})` },
          { key: 'active', label: `In Progress (${orders.filter(o => o.stage === 1 || o.stage === 2).length})` },
          { key: 'review', label: `In Review (${orders.filter(o => o.stage === 3 || o.stage === 4).length})` },
          { key: 'completed', label: `Completed (${orders.filter(o => o.stage === 5).length})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.key
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-surface-muted hover:text-surface-text hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List & Tracking Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (5 cols): Orders Cards List */}
        <div className="lg:col-span-5 space-y-4">
          {filteredOrders.map((ord) => {
            const isSelected = selectedOrder?.id === ord.id;

            return (
              <div
                key={ord.id}
                onClick={() => setSelectedOrder(ord)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-brand-500 ring-2 ring-brand-500/10 shadow-soft-lg'
                    : 'bg-white hover:border-slate-300 border-surface-border shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-[10px] font-bold text-surface-muted uppercase tracking-wider">
                    Order #{ord.id}
                  </span>
                  <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                    ord.stage === 5
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : ord.stage === 4
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-brand-50 text-brand-700 border border-brand-200'
                  }`}>
                    {stages.find(s => s.id === ord.stage)?.name || ord.status}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-surface-text mb-2 line-clamp-2">
                  {ord.serviceTitle}
                </h3>

                <div className="grid grid-cols-2 gap-2 text-xs text-surface-muted mb-3 pt-2 border-t border-surface-border">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400">Client / Buyer</span>
                    <span className="font-semibold text-slate-700 truncate block">{ord.clientName}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] uppercase font-bold text-slate-400">Escrow Amount</span>
                    <span className="font-extrabold text-brand-600 text-sm block">${ord.agreedAmount}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-surface-muted">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>Due: <strong>{ord.deliveryDate}</strong></span>
                  </span>
                  <span className="text-brand-600 font-bold flex items-center gap-0.5">
                    <span>Inspect Stages</span>
                    <ChevronRight size={13} />
                  </span>
                </div>
              </div>
            );
          })}

          {filteredOrders.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-surface-border p-6 text-xs text-surface-muted">
              No orders found in this category.
            </div>
          )}
        </div>

        {/* Right Column (7 cols): Detailed Order Tracker & Actions */}
        <div className="lg:col-span-7 space-y-6">
          {selectedOrder ? (
            <div className="space-y-6">
              
              {/* Detailed Progress Tracker Component */}
              <ProjectProgressTracker
                currentStage={selectedOrder.stage}
                onUpdateStage={(stageId) => handleStageNodeClick(selectedOrder, stageId)}
                interactive={true}
              />

              {/* Order Scope & Agreement Breakdown */}
              <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-soft space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-surface-muted">Order Details</span>
                    <h3 className="font-bold text-base text-surface-text">{selectedOrder.serviceTitle}</h3>
                  </div>
                  <button
                    onClick={() => startConversationWith(
                      { name: selectedOrder.clientName, avatar: selectedOrder.clientAvatar },
                      `Hi, regarding order #${selectedOrder.id}: `,
                      selectedOrder.serviceTitle
                    )}
                    className="px-3 py-1.5 rounded-xl border border-surface-border hover:bg-slate-50 text-xs font-bold text-brand-600 flex items-center gap-1.5 transition-colors"
                  >
                    <MessageSquare size={13} />
                    <span>Open Project Chat</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-surface-muted block">Agreed Amount</span>
                    <span className="text-base font-extrabold text-brand-600">${selectedOrder.agreedAmount}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-surface-muted block">Order Date</span>
                    <span className="font-semibold text-slate-700">{selectedOrder.orderDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-surface-muted block">Deadline</span>
                    <span className="font-semibold text-slate-700">{selectedOrder.deliveryDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-surface-muted block">Payment</span>
                    <span className="font-semibold text-emerald-600 flex items-center gap-1">
                      <ShieldCheck size={13} />
                      Secured
                    </span>
                  </div>
                </div>

                {/* Scope */}
                {selectedOrder.scope && (
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                    <span className="font-bold text-surface-text block">Agreed Scope of Work:</span>
                    <p className="text-slate-600 leading-relaxed">{selectedOrder.scope}</p>
                  </div>
                )}

                {/* Revision Policy */}
                {selectedOrder.revisionPolicy && (
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <RotateCcw size={14} className="text-violetAccent-600" />
                    <span><strong>Revision Policy:</strong> {selectedOrder.revisionPolicy}</span>
                  </div>
                )}
              </div>

              {/* Activity Updates History */}
              <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-soft space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-surface-muted">
                  Milestone Audit Trail & Updates
                </h4>

                <div className="space-y-3">
                  {selectedOrder.updates?.map((up, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs">
                      <div className="w-2 h-2 rounded-full bg-brand-600 mt-1.5 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-surface-text font-medium leading-snug">{up.message}</p>
                        <span className="text-[10px] text-surface-muted">{up.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center text-surface-muted bg-white rounded-2xl border border-surface-border">
              <Layers size={32} className="text-slate-300 mb-2" />
              <p className="text-xs">Select an order on the left to track progress and deliverables.</p>
            </div>
          )}
        </div>

      </div>

      {/* Stage Update Confirmation Modal */}
      <Modal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        title="Update Project Stage"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleConfirmStageUpdate} className="space-y-4">
          <p className="text-xs text-slate-600">
            You are moving order <strong>#{selectedOrder?.id}</strong> to:
          </p>

          <div className="p-3 bg-brand-50 border border-brand-200 rounded-xl">
            <span className="text-xs font-bold text-brand-700 block">
              Stage {targetStage}: {stages.find(s => s.id === targetStage)?.name}
            </span>
            <span className="text-[11px] text-brand-600/80">
              {stages.find(s => s.id === targetStage)?.desc}
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-surface-muted mb-1.5">
              Add Milestone Note / Deliverable Link
            </label>
            <textarea
              rows={3}
              value={updateNote}
              onChange={(e) => setUpdateNote(e.target.value)}
              placeholder="e.g. Shared Google Drive with video renders / GitHub release v1.0"
              className="w-full px-3 py-2 bg-slate-50 border border-surface-border rounded-xl text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
            />
          </div>

          {targetStage === 5 && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
              <strong>Escrow Release:</strong> Marking as Completed approves all deliverables and releases the payout of ${selectedOrder?.agreedAmount} from escrow!
            </div>
          )}

          <div className="pt-2 border-t border-surface-border flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsUpdateModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-surface-border text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 shadow-sm"
            >
              Confirm Stage Change
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default OrdersPage;

