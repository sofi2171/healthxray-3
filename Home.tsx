import React from 'react';
import { Link } from 'react-router-dom';
import AdUnit from './AdUnit';
import { useLanguage } from './LanguageContext';

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  
  const features = [
    { icon: 'fa-robot', title: t('aiConsultant'), desc: "Instant answers with Google Search grounding.", link: '/consultant', color: 'blue' },
    { icon: 'fa-calculator', title: t('calories'), desc: "Calculate your daily TDEE requirements.", link: '/calories', color: 'purple' },
    { icon: 'fa-dumbbell', title: t('exercise'), desc: "Biomechanical workout architecture.", link: '/exercise', color: 'indigo' },
    { icon: 'fa-apple-whole', title: t('nutrition'), desc: "Science-based meal programming.", link: '/nutrition', color: 'orange' },
    { icon: 'fa-gauge-high', title: t('bmi'), desc: "Precision BMI and metabolic analytics.", link: '/bmi', color: 'green' },
    { icon: 'fa-stethoscope', title: t('symptoms'), desc: "Neural network diagnostic triage.", link: '/symptoms', color: 'red' }
  ];

  const journalArticles = [
    { id: 1, title: t('bmiArtTitle'), excerpt: t('bmiArtP1'), img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800', tag: 'Clinical' },
    { id: 2, title: t('nutArtTitle'), excerpt: t('nutArtP1'), img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800', tag: 'Nutrition' },
    { id: 3, title: t('symArtTitle'), excerpt: t('symArtP1'), img: 'https://images.unsplash.com/photo-1584515159051-904097495574?auto=format&fit=crop&q=80&w=800', tag: 'Triage' }
  ];

  return (
    <div className={`flex flex-col w-full ${language === 'ur' ? 'font-urdu' : ''}`}>
      {/* HERO SECTION */}
      <section className="relative bg-slate-900 text-white py-20 md:py-32 w-full overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1920')] bg-cover"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="bg-blue-600/30 text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block border border-blue-500/30">Clinical Intelligence v3.0</span>
            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-tight italic uppercase tracking-tighter">
              {t('heroTitle').split(' ').map((word, i) => (
                <span key={i} className={i >= 2 ? 'text-blue-500' : ''}>{word} </span>
              ))}
            </h1>
            <p className="text-xl text-slate-300 mb-12 italic leading-relaxed max-w-xl">{t('heroSub')}</p>
            <Link to="/consultant" className="px-12 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-blue-900/40 hover:bg-blue-700 transition-all">
              {t('consultBtn')}
            </Link>
          </div>
          <div className="hidden lg:block relative">
             <div className="absolute -inset-10 bg-blue-600/10 blur-3xl rounded-full"></div>
             <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800" className="relative z-10 rounded-[48px] shadow-3xl border-4 border-slate-700" alt="Health AI Engine" />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 mt-16 w-full"><AdUnit type="banner" /></div>

      {/* TOOLS GRID */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter">Professional <span className="text-blue-600">Diagnostics</span></h2>
            <p className="text-slate-500 dark:text-slate-400 mt-4 italic">Select a module to begin your health architectural analysis.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((f, i) => (
              <Link key={i} to={f.link} className="group bg-white dark:bg-slate-900 p-10 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all">
                <div className={`w-16 h-16 bg-${f.color}-50 dark:bg-${f.color}-900/20 text-${f.color}-600 dark:text-${f.color}-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <i className={`fa-solid ${f.icon} text-2xl`}></i>
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 mb-4 uppercase italic">{f.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed italic">{f.desc}</p>
                <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em]">{t('openTool')}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MEDICAL JOURNAL SECTION */}
      <section className="py-24 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-16 border-b border-slate-100 dark:border-slate-800 pb-8">
            <div>
              <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] mb-2 block">{t('insightsTitle')}</span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">{t('insightsSub')}</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {journalArticles.map((art) => (
              <article key={art.id} className="group flex flex-col h-full">
                <div className="relative h-64 rounded-[40px] overflow-hidden mb-8 shadow-lg">
                  <img src={art.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={art.title} />
                  <div className="absolute top-6 left-6"><span className="bg-slate-900/80 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">{art.tag}</span></div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase italic leading-tight">{art.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm italic line-clamp-3 mb-6 flex-grow">{art.excerpt}</p>
                <Link to="/consultant" className="text-blue-600 font-black text-[10px] uppercase tracking-widest border-b-2 border-blue-600 pb-1 w-fit">{t('readMore')}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 mb-24 w-full"><AdUnit type="native" /></div>
    </div>
  );
};

export default Home;