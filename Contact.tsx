import React from 'react';
import AdUnit from './AdUnit';

const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <AdUnit type="banner" className="mb-16" />
      <h1 className="text-6xl font-black italic uppercase mb-12 tracking-tighter">Get In <span className="text-blue-600">Touch</span></h1>
      <div className="space-y-6">
        <p className="text-2xl font-bold italic text-slate-700 dark:text-slate-300">healthxray@gmail.com</p>
        <p className="text-xl font-black text-blue-600">+92 344 7814644</p>
      </div>
      <div className="mt-20 p-12 bg-slate-900 text-white rounded-[48px] max-w-2xl mx-auto border border-slate-800 shadow-2xl">
        <h3 className="text-xl font-black uppercase italic mb-4">Headquarters</h3>
        <p className="text-slate-400 italic font-medium">Wellness District, Health Architecture Core, Pakistan</p>
      </div>
    </div>
  );
};

export default Contact;