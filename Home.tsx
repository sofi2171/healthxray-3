import React from 'react';
import { Link } from 'react-router-dom';
import AdUnit from './AdUnit';
import { useLanguage } from './LanguageContext';

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  
  const features = [
    { icon: 'fa-robot', title: t('aiConsultant'), desc: t('aiConsultantDesc'), link: '/consultant', color: 'blue' },
    { icon: 'fa-calculator', title: t('calorieTitle'), desc: t('calorieDesc'), link: '/calories', color: 'purple' },
    { icon: 'fa-dumbbell', title: t('exerciseTitle'), desc: t('exerciseDesc'), link: '/exercise', color: 'indigo' },
    { icon: 'fa-apple-whole', title: t('nutritionTitle'), desc: t('nutritionDesc'), link: '/nutrition', color: 'orange' },
    { icon: 'fa-gauge-high', title: t('bmiTitle'), desc: t('bmiDesc'), link: '/bmi', color: 'green' },
    { icon: 'fa-stethoscope', title: t('symptomTitle'), desc: t('symptomDesc'), link: '/symptoms', color: 'red' }
  ];

  return (
    <div className={`flex flex-col w-full ${language === 'ur' ? 'font-urdu' : ''}`}>
      <section className="relative bg-slate-900 text-white py-20 md:py-32 w-full">
        <div className="max-w-7xl mx-auto px-4 text-center lg:text-left grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-tight">
              {t('heroTitle')}
            </h1>
            <p className="text-xl text-slate-300 mb-12 italic">{t('heroSub')}</p>
            <Link to="/consultant" className="px-12 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs">
              {t('consultBtn')}
            </Link>
          </div>
          <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800" className="rounded-[48px] shadow-3xl border-4 border-slate-700" alt="Health AI" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 mt-16 w-full"><AdUnit type="banner" /></div>

      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((f, i) => (
              <Link key={i} to={f.link} className="bg-white dark:bg-slate-900 p-10 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-all">
                <div className={`w-16 h-16 bg-${f.color}-50 dark:bg-${f.color}-900/20 text-${f.color}-600 dark:text-${f.color}-400 rounded-2xl flex items-center justify-center mb-8`}>
                  <i className={`fa-solid ${f.icon} text-2xl`}></i>
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 mb-4 uppercase italic">{f.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">{f.desc}</p>
                <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em]">{t('openTool')}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;