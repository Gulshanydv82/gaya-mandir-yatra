import React, { useState } from 'react';
import { apiService } from '../../services/api';
import { Sparkles, Send, Bot, User, RefreshCw } from 'lucide-react';

export const AIYatraAssistant: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: 'Pranam! I am Acharya Purva Yatra AI. Ask me anything about Vishnupad Temple darshan, Pind Daan rituals, Falgu River, Bodh Gaya tour, or custom Yatra package planning!',
    },
  ]);
  const [loading, setLoading] = useState(false);

  const samplePrompts = [
    'What is the ritual procedure for Gaya Pind Daan?',
    'What is the dress code for Vishnupad Temple?',
    'How far is Bodh Gaya from Gaya Railway Station?',
    'Can elderly citizens get wheelchair assistance at Gaya temple?',
  ];

  const handleAsk = async (textToSend?: string) => {
    const q = textToSend || prompt;
    if (!q.trim()) return;

    const newMsgs = [...messages, { sender: 'user' as const, text: q }];
    setMessages(newMsgs);
    setPrompt('');
    setLoading(true);

    try {
      const res = await apiService.askAIGuidance(q);
      setMessages([...newMsgs, { sender: 'ai', text: res.reply }]);
      setLoading(false);
    } catch (e) {
      console.error('AI error:', e);
      setMessages([
        ...newMsgs,
        {
          sender: 'ai',
          text: 'Gaya Vishnupad Temple is open from 5:00 AM to 9:00 PM. Performs Pind Daan at Falgu River and Sita Kund with certified Gayawal Pandits.',
        },
      ]);
      setLoading(false);
    }
  };

  return (
    <section className="py-14 bg-[#800000] text-[#FFFDF0] border-t border-b border-[#E6E2D3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF9933]/20 border border-[#FF9933]/40 text-[#FF9933] text-xs font-bold mb-2 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#FF9933] animate-pulse" />
            <span>AI Vedic Pilgrim Assistant</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white tracking-tight">
            Ask Acharya Purva Yatra AI
          </h2>
          <p className="text-xs text-white/80 mt-1">
            Get instant answers regarding Gaya rituals, auspicious dates, train connectivity, and temple rules.
          </p>
        </div>

        {/* Preset Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {samplePrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleAsk(p)}
              className="px-3 py-1.5 rounded-full bg-black/20 hover:bg-black/30 border border-white/20 text-[11px] font-medium text-white transition-all text-left cursor-pointer"
            >
              ✨ {p}
            </button>
          ))}
        </div>

        {/* Chat Window */}
        <div className="bg-[#3D2B1F]/90 border border-white/20 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-4 max-h-[420px] overflow-y-auto">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.sender === 'user' ? 'bg-[#FF9933] text-white' : 'bg-[#800000] text-white border border-white/30'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-[80%] ${
                  msg.sender === 'user'
                    ? 'bg-[#FF9933] text-white rounded-tr-none'
                    : 'bg-white/10 border border-white/20 text-[#FFFDF0] rounded-tl-none font-sans whitespace-pre-wrap'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-[#FF9933] font-semibold italic">
              <RefreshCw className="w-4 h-4 animate-spin text-[#FF9933]" />
              <span>Acharya AI is consulting sacred Gaya texts...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk();
          }}
          className="flex items-center gap-2 bg-[#3D2B1F] rounded-xl p-1.5 border border-white/20"
        >
          <input
            type="text"
            placeholder="Ask anything about Purva Yatra or Pind Daan rituals..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 px-3 py-2 bg-transparent text-white text-xs placeholder:text-white/50 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="px-5 py-2 bg-[#FF9933] hover:bg-[#e68a2e] disabled:opacity-50 text-white font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Send className="w-3.5 h-3.5" /> Ask AI
          </button>
        </form>
      </div>
    </section>
  );
};
