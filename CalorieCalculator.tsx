import React, { useState } from 'react';
import { getAIHealthAdvice } from './geminiService';
import AdUnit from './AdUnit';
import { useLanguage } from './LanguageContext';
import ArticleSection from './ArticleSection';

const CalorieCalculator: React.FC = () => {
  const { t } = useLanguage();
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [result, setResult] = useState<number | null>(null);
  const [aiAdvice, setAiAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const calculate = async () => {
    const a = parseInt(age); 
    const w = parseFloat(weight); 
    const h = parseFloat(height);
    
    if (a && w && h) {
      let bmr = (10 * w) + (6.25 * h) - (5 * a);
      if (gender === 'male') bmr += 5;
      else bmr -= 161;

      const tdee = Math.round(bmr * 1.2);
      setResult(tdee);
      setLoading(true);
      try { 
        const { text } = await getAIHealthAdvice(`My daily calorie expenditure (TDEE) is ${tdee} kcal. I am ${gender}, ${age} years old, weighing ${weight}kg. Give me 3 scientific tips to optimize my metabolism.`); 
        setAiAdvice(text);
      } catch (err) {
        console.error(err);
      } finally { setLoading(false); }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      <AdUnit type="banner" />
      <div className="relative w-full h-[300px] md:h-[450px] rounded-[48px] overflow-hidden shadow-2xl mb-12 bg-slate-200 dark:bg-slate-800">
        <img src="https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=1600" alt="Metabolic Calculator" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-10 left-10 right-10">
          <span className="bg-purple-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">Metabolic Lab</span>
          <h1 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-tight">Metabolic <span className="text-purple-500">Architect</span></h1>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[48px] shadow-2xl border border-slate-100 dark:border-slate-800">
          <h2 className="text-3xl font-black mb-8 uppercase italic border-l-4 border-purple-600 pl-4 text-slate-900 dark:text-slate-100">Calorie Tracker</h2>
          <div className="space-y-6">
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
              <button onClick={() => setGender('male')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${gender === 'male' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-slate-400'}`}>Male</button>
              <button onClick={() => setGender('female')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${gender === 'female' ? 'bg-white dark:bg-slate-700 shadow-sm text-pink-600' : 'text-slate-400'}`}>Female</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Age" className="w-full bg-slate-50 dark:bg-slate-800 border rounded-2xl px-6 py-4 outline-none text-slate-800 dark:text-slate-200"/>
              <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Weight (kg)" className="w-full bg-slate-50 dark:bg-slate-800 border rounded-2xl px-6 py-4 outline-none text-slate-800 dark:text-slate-200"/>
            </div>
            <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="Height (cm)" className="w-full bg-slate-50 dark:bg-slate-800 border rounded-2xl px-6 py-4 outline-none text-slate-800 dark:text-slate-200"/>
            <button onClick={calculate} className="w-full bg-purple-600 text-white font-black py-5 rounded-2xl uppercase text-xs tracking-widest hover:bg-purple-700 transition-all">Calculate TDEE</button>
          </div>
        </div>
        <div className="bg-slate-900 text-white p-10 rounded-[48px] flex flex-col justify-center border border-slate-800 shadow-2xl">
          {result ? (
            <div className="text-center">
              <h2 className="text-7xl font-black text-purple-400">{result}</h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest mt-2">Daily Maintenance Calories</p>
              <div className="mt-8 p-6 bg-white/5 rounded-3xl text-left border border-white/10">
                <p className="text-[10px] font-black text-purple-300 uppercase mb-2">AI Insight:</p>
                <p className="text-sm text-slate-300 italic">{loading ? "Analyzing..." : aiAdvice}</p>
              </div>
            </div>
          ) : <p className="text-center text-slate-500 italic">Enter your details to calculate metabolic rate.</p>}
        </div>
      </div>
      <ArticleSection tool="calories" />
    </div>
  );
};

export default CalorieCalculator;