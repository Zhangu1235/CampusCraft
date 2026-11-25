import React, { useState } from 'react';
import { Search, MessageSquare, GraduationCap, ShieldCheck, Plus, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ChatWindow from '../components/ChatWindow';
import SearchBar from '../components/SearchBar';

export const MessagingPage = () => {
  const { conversations, sendMessage, currentUser } = useApp();
  const [activeConvId, setActiveConvId] = useState(conversations[0]?.id || null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter((c) =>
    c.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.projectTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeConversation = conversations.find((c) => c.id === activeConvId) || conversations[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-surface-text">
            Messages & Milestone Collaboration
          </h1>
          <p className="text-xs text-surface-muted mt-0.5">
            Direct real-time communication between students and clients with escrow safeguards
          </p>
        </div>
      </div>

      {/* Main Messaging Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (4 cols): Conversations List */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-surface-border p-4 shadow-soft h-[700px] flex flex-col">
          <div className="mb-3">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search conversations..."
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {filteredConversations.map((conv) => {
              const isSelected = conv.id === (activeConversation?.id);

              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`p-3 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-brand-50 border-brand-200 shadow-xs'
                      : 'bg-white hover:bg-slate-50 border-transparent hover:border-surface-border'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={conv.user.avatar}
                        alt={conv.user.name}
                        className="w-11 h-11 rounded-2xl object-cover border border-slate-200"
                      />
                      {conv.user.status === 'online' && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs text-surface-text truncate">{conv.user.name}</h4>
                        <span className="text-[10px] text-surface-muted">{conv.timestamp}</span>
                      </div>

                      <p className="text-[10px] text-brand-600 font-semibold truncate mt-0.5">
                        {conv.projectTitle}
                      </p>

                      <p className="text-xs text-slate-600 truncate mt-1">
                        {conv.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredConversations.length === 0 && (
              <div className="text-center py-12 text-surface-muted text-xs">
                No conversations found matching search.
              </div>
            )}
          </div>
        </div>

        {/* Right Column (8 cols): Active Chat Window */}
        <div className="lg:col-span-8">
          <ChatWindow
            conversation={activeConversation}
            onSendMessage={sendMessage}
            currentUser={currentUser}
          />
        </div>

      </div>
    </div>
  );
};

export default MessagingPage;

