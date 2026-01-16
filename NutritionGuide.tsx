import React, { useState } from 'react';
import { getNutritionPlan } from './geminiService';
import { NutritionPlan } from './types';
import AdUnit from './AdUnit';
import { useLanguage } from './LanguageContext';
import ArticleSection from './ArticleSection';

const NutritionGuide: React.FC = () => {
  const { t } = useLanguage();
  const [goal, setGoal] = useState('weight loss');
  const [plan, setPlan] = useState<NutritionPlan | null>(null);
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    setLoading(true);
    try {
      const data = await getNutritionPlan(goal, 'balanced');
      setPlan(data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <AdUnit type="banner" />
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-1/3 bg-white dark:bg-slate-900 p-10 rounded-[40px] shadow-2xl border border-slate-100 dark:border-slate-800 transition-colors">
          <h2 className="text-3xl font-black mb-8 italic uppercase border-l-4 border-orange-500 pl-4 text-slate-900 dark:text-slate-100">{t('mealArchitect')}</h2>
          <select value={goal} onChange={(e) => setGoal(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-4 py-3 mb-8 outline-none text-slate-800 dark:text-slate-200">
            <option value="weight loss">{t('weightLoss')}</option>
            <option value="muscle gain">{t('muscleGain')}</option>
          </select>
          <button onClick={generatePlan} disabled={loading} className="w-full bg-orange-600 text-white font-black py-5 rounded-2xl hover:bg-orange-700 transition-all uppercase tracking-widest text-xs">
            {loading ? "..." : t('generate')}
          </button>
        </div>
        <div className="w-full lg:w-2/3 bg-white dark:bg-slate-900 p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 min-h-[400px]">
          {plan ? (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl">
                <span className="text-[10px] font-black text-orange-500 uppercase block mb-2">Breakfast</span>
                <p className="text-slate-700 dark:text-slate-300 font-medium">{plan.breakfast}</p>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl">
                <span className="text-[10px] font-black text-orange-500 uppercase block mb-2">Lunch</span>
                <p className="text-slate-700 dark:text-slate-300 font-medium">{plan.lunch}</p>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl">
                <span className="text-[10px] font-black text-orange-500 uppercase block mb-2">Dinner</span>
                <p className="text-slate-700 dark:text-slate-300 font-medium">{plan.dinner}</p>
              </div>
            </div>
          ) : <div className="flex items-center justify-center h-full text-slate-400 italic">Select goal and generate plan.</div>}
        </div>
      </div>
      <ArticleSection tool="nutrition" />
    </div>
  );
};

export default NutritionGuide;