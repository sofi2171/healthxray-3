import React, { useState } from 'react';
import { getAIHealthAdvice } from './geminiService';
import AdUnit from './AdUnit';
import { useLanguage } from './LanguageContext';
import ArticleSection from './ArticleSection';

const SymptomChecker: React.FC = () => {
  const { t } = useLanguage();
  const [symptoms, setSymptoms] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [sources, setSources] = useState<{ title: string; uri: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const checkSymptoms = async () => {
    if (!symptoms.trim()) return;
    setLoading(true);
    try {
      const { text, sources } = await getAIHealthAdvice(`Analyze symptoms: ${symptoms}. Categorize urgency and clinical profile.`, "Diagnostic Triage");
      setAnalysis(text || null);
      setSources(sources || []);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <AdUnit type="banner" />
      <div className="relative w-full h-[300px] md:h-[450px] rounded-[48px] overflow-hidden shadow-2xl mb-12 bg-slate-200 dark:bg-slate-800">
        <img src="https://images.unsplash.com/photo-1584515159051-904097495574?auto=format&fit=crop&q=80&w=1600" alt="Triage Core" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
        <div className="absolute bottom-10 left-10 right-10">
          <span className="bg-red-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block shadow-lg">Neural Triage v2.0</span>
          <h1 className="text-3xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-tight">Diagnostic <span className="text-red-500">Core</span></h1>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-[48px] shadow-3xl overflow-hidden border border-slate-100 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
        <div className="p-10 lg:p-20 bg-slate-50/50 dark:bg-slate-950/20 border-r border-slate-100 dark:border-slate-800">
          <h2 className="text-3xl font-black mb-8 uppercase italic border-l-4 border-red-600 pl-4 text-slate-900 dark:text-slate-100">Reporting Module</h2>
          <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} rows={8} placeholder={t('describeSymptoms')} className="w-full bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-[32px] px-8 py-8 mb-8 outline-none focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/20 text-slate-700 dark:text-slate-200 transition-all font-medium text-lg"/>
          <button onClick={checkSymptoms} disabled={loading || !symptoms.trim()} className="w-full bg-red-600 text-white font-black py-6 rounded-3xl shadow-2xl hover:bg-red-700 transition-all uppercase tracking-widest text-sm flex items-center justify-center space-x-3">
            {loading ? <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div> : <span>{t('analyze')}</span>}
          </button>
        </div>
        <div className="p-10 lg:p-20 relative overflow-y-auto">
          <h3 className="text-xl font-black mb-10 uppercase italic flex items-center text-red-600">
            <i className="fa-solid fa-brain mr-4"></i> AI Assessment
          </h3>
          {analysis ? (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-700">
              <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed font-medium italic text-lg">{analysis}</div>
              {sources.length > 0 && (
                <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Medical Evidence Grounding:</h4>
                  <div className="space-y-3">
                    {sources.map((s, idx) => (
                      <a key={idx} href={s.uri} target="_blank" rel="noopener noreferrer" className="flex items-center group bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl hover:bg-red-50 dark:hover:bg-slate-700 border dark:border-slate-700 transition-all">
                        <i className="fa-solid fa-file-medical text-red-600 mr-4"></i>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-red-700">{s.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full opacity-20 grayscale">
              <i className="fa-solid fa-microscope text-7xl mb-6"></i>
              <p className="font-black uppercase tracking-widest">Waiting for input...</p>
            </div>
          )}
        </div>
      </div>
      <ArticleSection tool="symptoms" />
    </div>
  );
};

export default SymptomChecker;