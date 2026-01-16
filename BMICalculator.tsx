import React, { useState } from 'react';
import { getAIHealthAdvice } from './geminiService';
import AdUnit from './AdUnit';
import { useLanguage } from './LanguageContext';
import ArticleSection from './ArticleSection';

const BMICalculator: React.FC = () => {
  const { t } = useLanguage();
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<{ score: number; category: string } | null>(null);
  const [aiAdvice, setAiAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const calculateBMI = async () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      const score = parseFloat((w / (h * h)).toFixed(1));
      let category = score < 18.5 ? 'Underweight' : score < 25 ? 'Normal weight' : score < 30 ? 'Overweight' : 'Obese';
      setResult({ score, category });
      setLoading(true);
      try {
        const advice = await getAIHealthAdvice(`My BMI is ${score} (${category}). Give me quick tips.`);
        setAiAdvice(advice.text || '');
      } catch (err) { console.error(err); } finally { setLoading(false); }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <AdUnit type="banner" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[40px] shadow-2xl border border-slate-100 dark:border-slate-800">
          <h2 className="text-3xl font-black mb-8 italic uppercase border-l-4 border-green-500 pl-4 text-slate-900 dark:text-slate-100">{t('bmiTitle')}</h2>
          <div className="space-y-6">
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder={t('weight')} className="w-full bg-slate-50 dark:bg-slate-800 border rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-green-500 text-slate-800 dark:text-slate-200"/>
            <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder={t('height')} className="w-full bg-slate-50 dark:bg-slate-800 border rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-green-500 text-slate-800 dark:text-slate-200"/>
            <button onClick={calculateBMI} className="w-full bg-slate-900 dark:bg-green-700 text-white font-black py-5 rounded-2xl hover:bg-black transition-all uppercase tracking-widest text-xs">{t('calculate')}</button>
          </div>
          {result && (
            <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-3xl text-center border border-green-100 dark:border-green-800">
              <h3 className="text-5xl font-black text-green-600">{result.score}</h3>
              <p className="font-bold text-green-800 dark:text-green-300 uppercase tracking-widest">{result.category}</p>
            </div>
          )}
        </div>
        <div className="bg-slate-900 text-white p-10 rounded-[40px] shadow-2xl flex flex-col justify-center border border-slate-800">
          <h3 className="text-xl font-black mb-6 uppercase italic text-green-400">{t('aiInsight')}</h3>
          {loading ? <p className="animate-pulse">{t('thinking')}</p> : <p className="text-slate-300 italic leading-relaxed">{aiAdvice || "Enter data for AI insight."}</p>}
        </div>
      </div>
      <ArticleSection tool="bmi" />
    </div>
  );
};

export default BMICalculator;