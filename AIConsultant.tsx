import React, { useState, useRef, useEffect } from 'react';
import { getAIHealthAdvice } from './geminiService';
import { ChatMessage } from './types';
import AdUnit from './AdUnit';
import { useLanguage } from './LanguageContext';
import ArticleSection from './ArticleSection';

interface ExtendedChatMessage extends ChatMessage {
  sources?: { title: string; uri: string }[];
}

const AIConsultant: React.FC = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<ExtendedChatMessage[]>([{ 
    role: 'assistant', 
    text: "Hello! I'm your HealthXRay AI Consultant. I have access to real-time medical data via Google Search. How can I assist you today?", 
    timestamp: new Date() 
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; 
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage: ExtendedChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    try {
      const { text, sources } = await getAIHealthAdvice(input);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: text || "Error processing request.", 
        timestamp: new Date(), 
        sources 
      }]);
    } catch (error) { 
      console.error(error); 
    } finally { 
      setIsLoading(false); 
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-4 py-10 space-y-12">
      <AdUnit type="banner" />
      <div className="relative w-full h-[300px] md:h-[450px] rounded-[48px] overflow-hidden shadow-2xl mb-12 bg-slate-200 dark:bg-slate-800">
        <img src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=1600" alt="AI Consultant" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
        <div className="absolute bottom-10 left-10 right-10">
          <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">Neural Intelligence Engine</span>
          <h1 className="text-3xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-tight">AI Medical <span className="text-blue-500">Consultant</span></h1>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-slate-900 rounded-[48px] shadow-3xl overflow-hidden border border-slate-100 dark:border-slate-800 min-h-[850px] transition-colors">
        <div className="lg:col-span-8 flex flex-col h-[850px] border-r border-slate-100 dark:border-slate-800">
          <div className="bg-slate-900 dark:bg-slate-950 p-6 text-white flex justify-between items-center shadow-md">
            <h2 className="text-xl font-black uppercase italic tracking-tighter">HX-9000 Intelligence</h2>
          </div>
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 space-y-8 bg-slate-50 dark:bg-slate-950/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-500`}>
                <div className={`rounded-[32px] px-8 py-6 shadow-sm border ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200'}`}>
                  <p className="text-base font-medium">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-8 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex space-x-4 items-center">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder={t('askSomething')} className="flex-grow bg-slate-50 dark:bg-slate-800 border rounded-3xl px-8 py-5 outline-none"/>
            <button onClick={handleSend} disabled={isLoading || !input.trim()} className="bg-blue-600 text-white w-16 h-16 rounded-3xl flex items-center justify-center hover:scale-105 transition-all"><i className="fa-solid fa-paper-plane text-xl"></i></button>
          </div>
        </div>
        <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-950 p-10 hidden lg:flex flex-col space-y-10">
          <div className="p-8 bg-white dark:bg-slate-900 rounded-[32px] shadow-sm"><p className="text-[11px] text-slate-500 italic">"Disclaimer: This AI is for informational purposes only. Consult a doctor for clinical diagnosis."</p></div>
        </div>
      </div>
      <ArticleSection tool="consultant" />
    </div>
  );
};

export default AIConsultant;