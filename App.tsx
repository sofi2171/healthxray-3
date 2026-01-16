import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import { ThemeProvider } from './ThemeContext';
import Home from './Home';
import AIConsultant from './AIConsultant';
import BMICalculator from './BMICalculator';
import NutritionGuide from './NutritionGuide';
import SymptomChecker from './SymptomChecker';
import CalorieCalculator from './CalorieCalculator';
import ExercisePlanner from './ExercisePlanner';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import Contact from './Contact';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <HashRouter>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <Header />
            <main className="flex-grow flex flex-col w-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/consultant" element={<AIConsultant />} />
                <Route path="/bmi" element={<BMICalculator />} />
                <Route path="/nutrition" element={<NutritionGuide />} />
                <Route path="/symptoms" element={<SymptomChecker />} />
                <Route path="/calories" element={<CalorieCalculator />} />
                <Route path="/exercise" element={<ExercisePlanner />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;