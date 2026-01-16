import React from 'react';
import AdUnit from './AdUnit';

const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <AdUnit type="banner" className="mb-12" />
      <h1 className="text-4xl font-black italic uppercase mb-8 border-l-8 border-indigo-600 pl-6">Terms of Service</h1>
      <div className="bg-red-50 dark:bg-red-900/10 p-10 rounded-[40px] border border-red-100 dark:border-red-900/30 mb-10">
        <h2 className="text-xl font-bold text-red-800 dark:text-red-400 uppercase italic mb-4">Medical Disclaimer</h2>
        <p className="text-red-700 dark:text-red-300 font-bold italic leading-relaxed">
          HealthXRay is an AI platform for information only. It IS NOT a medical professional and cannot provide official clinical diagnoses. Always consult a doctor.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;