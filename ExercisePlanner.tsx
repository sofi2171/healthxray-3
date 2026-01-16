import React, { useState } from 'react';
import { getExercisePlan } from './geminiService';
import { WorkoutPlan } from './types';
import AdUnit from './AdUnit';
import { useLanguage } from './LanguageContext';
import ArticleSection from './ArticleSection';

const ExercisePlanner: React.FC = () => {
  const { t } = useLanguage();
  const [goal, setGoal] = useState('Build Muscle');
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [loading, setLoading] = useState(false);

  const generateWorkout = async () => {
    setLoading(true);
    try {
      const data = await getExercisePlan(goal, 'Intermediate', 'Full Gym');
      setPlan(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <AdUnit type="banner" />
      <div className="relative w-full h-[300px] md:h-[450px] rounded-[48px] overflow-hidden shadow-2xl mb-12 bg-slate-200 dark:bg-slate-800">
        <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1600" alt="Workout Architect" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-10 left-10 right-10">
          <span className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">Physiological Performance</span>
          <h1 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-tight">Workout <span className="text-indigo-400">Architect</span></h1>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-10 rounded-[40px] shadow-2xl border border-slate-100 dark:border-slate-800 h-fit transition-colors">
          <h2 className="text-2xl font-black mb-8 italic uppercase border-l-4 border-indigo-600 pl-4 text-slate-900 dark:text-slate-100">Routine Goal</h2>
          <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border rounded-xl px-4 py-3 mb-8 outline-none text-slate-800 dark:text-slate-200">
            <option value="Build Muscle">Build Muscle</option>
            <option value="Fat Loss">Fat Loss</option>
            <option value="Endurance">Endurance</option>
          </select>
          <button onClick={generateWorkout} disabled={loading} className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl uppercase text-xs tracking-widest hover:bg-indigo-700 transition-all">
            {loading ? "Generating..." : "Generate Routine"}
          </button>
        </div>
        <div className="lg:col-span-2">
          {plan ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-700">
              <div className="bg-white dark:bg-slate-900 p-10 rounded-[40px] border border-slate-100 dark:border-slate-800">
                <h3 className="text-2xl font-black text-indigo-600 mb-6 italic">{plan.routineName}</h3>
                <div className="space-y-6">
                  {plan.exercises.map((ex, i) => (
                    <div key={i} className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-black text-slate-900 dark:text-slate-100 uppercase italic">{ex.name}</h4>
                        <span className="text-xs font-bold text-indigo-500">{ex.sets} x {ex.reps}</span>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{ex.instruction}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : <div className="p-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[48px] text-center text-slate-400 italic">Select a goal and generate your workout.</div>}
        </div>
      </div>
      <ArticleSection tool="exercise" />
    </div>
  );
};

export default ExercisePlanner;