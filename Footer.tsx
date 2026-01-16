import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-slate-800 pb-12">
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-blue-600 p-2 rounded-lg">
                <i className="fa-solid fa-notes-medical text-white text-xl"></i>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight italic">Health<span className="text-blue-600">XRay</span></span>
            </div>
            <p className="text-sm text-slate-400">Leading the way in digital healthcare through AI-driven insights and professional diagnostic tools.</p>
          </div>
          <div>
            <h3 className="text-white font-black uppercase text-[10px] mb-6 text-blue-500">Quick Links</h3>
            <ul className="space-y-3 text-sm font-bold">
              <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
              <li><Link to="/bmi" className="hover:text-blue-400">BMI Analytics</Link></li>
              <li><Link to="/nutrition" className="hover:text-blue-400">Nutrition Matrix</Link></li>
              <li><Link to="/exercise" className="hover:text-blue-400">Workout Architect</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-black uppercase text-[10px] mb-6 text-blue-500">Legal</h3>
            <ul className="space-y-3 text-sm font-bold">
              <li><Link to="/privacy" className="hover:text-blue-400">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-blue-400">Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-black uppercase text-[10px] mb-6 text-blue-500">Contact</h3>
            <p className="text-sm font-bold text-slate-400 italic">healthxray@gmail.com</p>
            <p className="text-sm font-bold text-slate-400 mt-2">+92 344 7814644</p>
          </div>
        </div>
        <div className="text-center text-[10px] text-slate-500 font-black uppercase tracking-widest">
          © 2026 Powered by healthxray.online | Engineered by SUFIAN X
        </div>
      </div>
    </footer>
  );
};

export default Footer;