import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FeedbackModal from './FeedbackModal';
import { useLanguage } from './LanguageContext';
import { useTheme } from './ThemeContext';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { name: t('home'), path: '/' },
    { name: t('consultant'), path: '/consultant' },
    { name: t('bmi'), path: '/bmi' },
    { name: t('calories'), path: '/calories' },
    { name: t('nutrition'), path: '/nutrition' },
    { name: t('exercise'), path: '/exercise' },
    { name: t('symptoms'), path: '/symptoms' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <i className="fa-solid fa-notes-medical text-white text-xl"></i>
                </div>
                <span className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Health<span className="text-blue-600">XRay</span></span>
              </Link>
            </div>

            <nav className="hidden xl:flex space-x-6 items-center">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-bold transition-colors ${
                    isActive(item.path) 
                      ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="flex items-center space-x-3 ml-4">
                <button
                  onClick={toggleTheme}
                  className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 border border-slate-200 dark:border-slate-700 hover:scale-110 transition-all shadow-sm"
                >
                  <i className={`fa-solid ${theme === 'light' ? 'fa-moon' : 'fa-sun'} text-sm`}></i>
                </button>

                <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
                  <i className="fa-solid fa-language text-blue-600 dark:text-blue-400 pl-3 text-sm"></i>
                  <select 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value as any)}
                    className="bg-transparent text-slate-800 dark:text-slate-200 text-[11px] font-black uppercase px-2 py-1.5 outline-none appearance-none cursor-pointer pr-4"
                  >
                    <option value="en">English</option>
                    <option value="ur">اردو</option>
                    <option value="hi">हिन्दी</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => setIsFeedbackOpen(true)}
                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center space-x-2"
              >
                <i className="fa-solid fa-comment-dots"></i>
                <span>{t('feedback')}</span>
              </button>
            </nav>

            <div className="xl:hidden flex items-center space-x-3">
              <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 dark:text-slate-400 p-2">
                <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="xl:hidden bg-white dark:bg-slate-900 border-t border-slate-100 py-6">
            <div className="px-4 space-y-3">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-2xl text-base font-bold text-slate-600 dark:text-slate-400">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </>
  );
};

export default Header;