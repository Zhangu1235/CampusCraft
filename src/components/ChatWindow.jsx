import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical, 
  CheckCheck, 
  FileText, 
  Image as ImageIcon,
  GraduationCap,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const ChatWindow = ({ 
  conversation, 
  onSendMessage,
  currentUser
}) => {
  const [inputText, setInputText] = useState('');
  const [attachment, setAttachment] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  if (!conversation) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center text-surface-muted bg-white rounded-2xl border border-surface-border">
        <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 mb-4">
          <Send size={24} />
        </div>
        <h3 className="font-bold text-surface-text text-base">Select a conversation</h3>
        <p className="text-xs max-w-sm mt-1">Choose a student freelancer or client from the list to start discussing milestones and deliverables.</p>
      </div>
    );
  }

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() && !attachment) return;
    onSendMessage(conversation.id, inputText, attachment);
    setInputText('');
    setAttachment(null);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachment({
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        type: file.type
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-surface-border flex flex-col h-[700px] shadow-soft overflow-hidden">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-surface-border flex items-center justify-between bg-slate-50/70">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={conversation.user.avatar}
              alt={conversation.user.name}
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
            />
            {conversation.user.status === 'online' && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-surface-text text-sm">{conversation.user.name}</h4>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {conversation.user.status === 'online' ? 'Active Now' : 'Offline'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-surface-muted">
              <span>{conversation.user.role}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <GraduationCap size={12} />
                {conversation.user.college}
              </span>
            </div>
          </div>
        </div>

        {/* Project Context Pill */}
        {conversation.projectTitle && (
          <div className="hidden sm:flex items-center gap-2 bg-brand-50 border border-brand-100 px-3 py-1.5 rounded-xl">
            <ShieldCheck size={14} className="text-brand-600" />
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider font-bold text-brand-600 block">Related Project</span>
              <span className="text-xs font-semibold text-surface-text truncate max-w-[200px] block">
                {conversation.projectTitle}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/30">
        <div className="text-center my-2">
          <span className="text-[11px] text-surface-muted bg-white border border-surface-border px-3 py-1 rounded-full shadow-xs">
            End-to-end encrypted • CampusCraft Escrow Active
          </span>
        </div>

        {conversation.messages.map((msg) => {
          const isMe = msg.sender === 'me';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl p-3.5 shadow-xs text-xs leading-relaxed ${
                  isMe
                    ? 'bg-brand-600 text-white rounded-tr-none'
                    : 'bg-white text-surface-text border border-surface-border rounded-tl-none'
                }`}
              >
                {msg.text && <p className="whitespace-pre-wrap">{msg.text}</p>}

                {/* Attachment simulation */}
                {msg.attachment && (
                  <div className={`mt-2 flex items-center gap-2 p-2 rounded-xl text-xs ${
                    isMe ? 'bg-brand-700/60 text-white' : 'bg-slate-100 text-slate-800'
                  }`}>
                    <FileText size={16} />
                    <div className="truncate flex-1">
                      <p className="font-semibold truncate">{msg.attachment.name}</p>
                      <p className="text-[10px] opacity-75">{msg.attachment.size}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1 mt-1 text-[10px] text-surface-muted px-1">
                <span>{msg.time}</span>
                {isMe && <CheckCheck size={12} className="text-brand-600" />}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Attachment preview if selected */}
      {attachment && (
        <div className="px-6 py-2 bg-brand-50/60 border-t border-brand-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-brand-700 font-medium truncate">
            <Paperclip size={14} />
            <span className="truncate">Ready to attach: {attachment.name} ({attachment.size})</span>
          </div>
          <button
            onClick={() => setAttachment(null)}
            className="text-brand-600 hover:text-rose-600 font-bold ml-2"
          >
            Remove
          </button>
        </div>
      )}

      {/* Input Box */}
      <form onSubmit={handleSend} className="p-4 border-t border-surface-border bg-white flex items-center gap-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-surface-muted hover:text-brand-600 rounded-xl hover:bg-slate-100 transition-colors"
          title="Attach deliverables or specs"
        >
          <Paperclip size={18} />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Message ${conversation.user.name}...`}
          className="flex-1 bg-slate-50 border border-surface-border rounded-xl px-4 py-2.5 text-xs text-surface-text focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all"
        />

        <button
          type="submit"
          disabled={!inputText.trim() && !attachment}
          className={`p-2.5 rounded-xl font-bold flex items-center justify-center transition-all ${
            inputText.trim() || attachment
              ? 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;

