import React from 'react';
import AdUnit from './AdUnit';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <AdUnit type="banner" className="mb-12" />
      <h1 className="text-4xl font-black italic uppercase mb-8 border-l-8 border-blue-600 pl-6">Privacy Policy</h1>
      <div className="prose dark:prose-invert max-w-none space-y-6">
        <p className="text-lg italic font-medium">Your health data is private. HealthXRay does not store your clinical queries on permanent servers.</p>
        <h2 className="text-xl font-bold uppercase italic mt-10">Data Collection</h2>
        <p>We only use the data you provide in real-time to generate AI responses. Once the session ends, your input is discarded.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;