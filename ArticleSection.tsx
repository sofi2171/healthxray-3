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
    <article className={`mt-32 max-w-5xl mx-auto ${language === 'ur' ? 'font-urdu' : ''}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 border-b border-slate-200 dark:border-slate-800 pb-8 gap-6">
        <div className="flex items-center space-x-4">
          <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">{keys.cat}</span>
        </div>
      </div>
      <div className="space-y-10">
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tighter italic uppercase leading-tight">
          {t(keys.title)}
        </h2>
        <img src={getToolImage()} alt={t(keys.title)} className="w-full h-auto rounded-[48px] shadow-3xl" />
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{t(keys.p1)}</p>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mt-8">{t(keys.p2)}</p>
          <div className="bg-blue-50 dark:bg-slate-800 p-10 rounded-[40px] mt-12 border border-blue-100 dark:border-slate-700">
             <p className="text-xl text-slate-800 dark:text-slate-200 font-bold italic">"{t(keys.p3)}"</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleSection;