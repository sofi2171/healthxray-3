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
      const { text, sources } = await getAIHealthAdvice(`Analyze symptoms: ${symptoms}`, "Diagnostic Triage");
      setAnalysis(text || null);
      setSources(sources || []);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      <AdUnit type="banner" />
      <div className="bg-white dark:bg-slate-900 rounded-[48px] shadow-3xl overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col lg:row">
        <div className="w-full p-10 lg:p-20">
          <h2 className="text-4xl font-black mb-8 uppercase italic border-l-4 border-red-600 pl-4 text-slate-900 dark:text-slate-100">{t('diagnosticCore')}</h2>
          <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} rows={6} placeholder={t('describeSymptoms')} className="w-full bg-slate-50 dark:bg-slate-800 border rounded-[32px] px-8 py-8 mb-8 outline-none focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/20 text-slate-700 dark:text-slate-200 transition-all font-medium"/>
          <button onClick={checkSymptoms} disabled={loading || !symptoms.trim()} className="w-full bg-red-600 text-white font-black py-6 rounded-3xl shadow-2xl hover:bg-red-700 transition-all uppercase tracking-widest text-sm flex items-center justify-center space-x-3">
            {loading ? <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div> : <span>{t('analyze')}</span>}
          </button>
          {analysis && (
            <div className="mt-12 p-10 bg-slate-50 dark:bg-slate-800 rounded-[32px] border border-slate-100 dark:border-slate-700">
               <h3 className="text-xl font-black mb-6 uppercase italic text-red-600">{t('aiInsight')}</h3>
               <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{analysis}</div>
            </div>
          )}
        </div>
      </div>
      <ArticleSection tool="symptoms" />
    </div>
  );
};

export default SymptomChecker;