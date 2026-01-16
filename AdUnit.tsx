import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';

interface AdUnitProps {
  type: 'banner' | 'sidebar' | 'inline' | 'native';
  className?: string;
}

const AdUnit: React.FC<AdUnitProps> = ({ type, className = "" }) => {
  const [manualClose, setManualClose] = useState(false);
  if (manualClose) return null;

  return (
    <div className={`relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex items-center p-6 ${className}`}>
      <div className="absolute top-2 left-4 text-[8px] font-black text-slate-400 uppercase tracking-widest">Sponsored</div>
      <button onClick={() => setManualClose(true)} className="absolute top-2 right-4 text-slate-400 hover:text-slate-900 transition-colors"><i className="fa-solid fa-xmark text-xs"></i></button>
      <div className="flex items-center space-x-6">
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center"><i className="fa-solid fa-kit-medical text-blue-600 text-2xl"></i></div>
        <div>
          <h4 className="font-black text-slate-900 dark:text-white uppercase text-sm italic">PureVital Vitamins</h4>
          <p className="text-xs text-slate-500 italic">Boost your immune system today. 20% OFF.</p>
        </div>
      </div>
    </div>
  );
};

export default AdUnit;