import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ur' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: "Home",
    consultant: "Consultant",
    bmi: "BMI",
    calories: "Calories",
    nutrition: "Nutrition",
    exercise: "Exercise",
    symptoms: "Symptoms",
    heroTitle: "Professional AI Health Care",
    heroSub: "HealthXRay brings world-class medical intelligence to your fingertips.",
    consultBtn: "Consult AI",
    weight: "Weight (kg)",
    height: "Height (cm)",
    age: "Age",
    calculate: "CALCULATE",
    generate: "GENERATE",
    analyze: "START ASSESSMENT",
    thinking: "AI is thinking...",
    askSomething: "Ask something...",
    feedback: "Feedback",
    privacyTitle: "Privacy Policy",
    termsTitle: "Terms of Service",
    contactTitle: "Connect With Us",
    dispatch: "DISPATCH"
  },
  ur: {
    home: "ہوم",
    consultant: "مشیر",
    bmi: "بی ایم آئی",
    calories: "کیلوریز",
    nutrition: "غذائیت",
    exercise: "ورزش",
    symptoms: "علامات",
    heroTitle: "پروفیشنل اے آئی ہیلتھ کیئر",
    heroSub: "ہیلتھ ایکس رے عالمی معیار کی طبی ذہانت لاتا ہے۔",
    consultBtn: "مشورہ لیں",
    weight: "وزن (کلوگرام)",
    height: "قد (سینٹی میٹر)",
    age: "عمر",
    calculate: "حساب لگائیں",
    generate: "بنائیں",
    analyze: "تجزیہ شروع کریں",
    thinking: "اے آئی سوچ رہا ہے...",
    askSomething: "کچھ پوچھیں...",
    feedback: "تاثرات",
    privacyTitle: "پرائیسی پالیسی",
    termsTitle: "سروس کی شرائط",
    contactTitle: "رابطہ کریں",
    dispatch: "ارسال کریں"
  },
  hi: {
    home: "होम",
    consultant: "सलाहकार",
    bmi: "बीएमआई",
    calories: "कैलोरी",
    nutrition: "पोषण",
    exercise: "व्यायाम",
    symptoms: "लक्षण",
    heroTitle: "प्रोफेशनल एआई स्वास्थ्य सेवा",
    heroSub: "HealthXRay विश्व स्तरीय चिकित्सा बुद्धिमत्ता प्रदान करता है।",
    consultBtn: "एआई सलाह",
    weight: "वजन (किग्रा)",
    height: "ऊंचाई (सेमी)",
    age: "आयु",
    calculate: "गणना करें",
    generate: "बनाएं",
    analyze: "शुरू करें",
    thinking: "एआई सोच रहा है...",
    askSomething: "कुछ पूछें...",
    feedback: "प्रतिक्रिया",
    privacyTitle: "गोपनीयता नीति",
    termsTitle: "सेवा की शर्तें",
    contactTitle: "संपर्क करें",
    dispatch: "भेजें"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('hxray_lang') as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('hxray_lang', lang);
  };

  const t = (key: string) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};