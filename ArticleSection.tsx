import React from 'react';
import { useLanguage } from './LanguageContext';

interface ArticleSectionProps {
  tool: 'bmi' | 'nutrition' | 'symptoms' | 'calories' | 'exercise' | 'consultant';
}

const ArticleSection: React.FC<ArticleSectionProps> = ({ tool }) => {
  const { t, language } = useLanguage();

  const getToolImage = () => {
    switch (tool) {
      case 'bmi': return "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200";
      case 'nutrition': return "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200";
      case 'symptoms': return "https://images.unsplash.com/photo-1584515159051-904097495574?auto=format&fit=crop&q=80&w=1200";
      case 'calories': return "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=1200";
      case 'exercise': return "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200";
      case 'consultant': return "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=1200";
      default: return "https://images.unsplash.com/photo-1505751172107-573225a9627e?auto=format&fit=crop&q=80&w=1200";
    }
  };

  const getArticleKeys = () => {
    switch(tool) {
      case 'bmi': return { title: 'bmiArtTitle', p1: 'bmiArtP1', p2: 'bmiArtP2', p3: 'bmiArtP3', cat: 'Clinical Metric' };
      case 'nutrition': return { title: 'nutArtTitle', p1: 'nutArtP1', p2: 'nutArtP2', p3: 'nutArtP3', cat: 'Dietetics' };
      case 'symptoms': return { title: 'symArtTitle', p1: 'symArtP1', p2: 'symArtP2', p3: 'symArtP3', cat: 'Triage' };
      case 'calories': return { title: 'calArtTitle', p1: 'calArtP1', p2: 'calArtP2', p3: 'calArtP3', cat: 'Metabolism' };
      case 'exercise': return { title: 'exeArtTitle', p1: 'exeArtP1', p2: 'exeArtP2', p3: 'exeArtP3', cat: 'Physiology' };
      case 'consultant': return { title: 'conArtTitle', p1: 'conArtP1', p2: 'conArtP2', p3: 'conArtP3', cat: 'AI Ethics' };
      default: return { title: 'bmiArtTitle', p1: 'bmiArtP1', p2: 'bmiArtP2', p3: 'bmiArtP3', cat: 'General' };
    }
  };

  const keys = getArticleKeys();

  return (
    <article className={`mt-32 max-w-5xl mx-auto pb-20 ${language === 'ur' ? 'font-urdu' : ''}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 border-b border-slate-200 dark:border-slate-800 pb-8 gap-6">
        <div className="flex items-center space-x-4">
          <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">{keys.cat}</span>
          <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest italic">Research ID: #HX-2026</span>
        </div>
      </div>
      <div className="space-y-12">
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tighter italic uppercase leading-tight">
          {t(keys.title)}
        </h2>
        <div className="relative rounded-[64px] overflow-hidden shadow-3xl h-[400px]">
          <img src={getToolImage()} alt={t(keys.title)} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
        </div>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium italic mb-10 border-l-4 border-blue-600 pl-8">{t(keys.p1)}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed italic">{t(keys.p2)}</p>
            <div className="bg-slate-900 dark:bg-slate-800 p-10 rounded-[48px] shadow-2xl flex items-center border border-slate-700">
               <p className="text-xl text-blue-400 font-black italic uppercase leading-tight">"{t(keys.p3)}"</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleSection;