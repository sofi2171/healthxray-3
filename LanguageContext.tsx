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
    dispatch: "DISPATCH",
    openTool: "Open Tool",
    insightsTitle: "Medical Journal Insights",
    insightsSub: "Evidence-based research and clinical excellence.",
    readMore: "Read Full Article",
    // Article Content
    bmiArtTitle: "Understanding BMI & Metabolic Health",
    bmiArtP1: "Body Mass Index (BMI) is a widely recognized physiological screening tool used to categorize individuals based on their height-to-weight ratio. Research shows that BMI correlates highly with body fatness and metabolic risks.",
    bmiArtP2: "Maintaining a healthy BMI (18.5 - 24.9) reduces risks of Type 2 diabetes and cardiovascular diseases. However, it doesn't distinguish between muscle and fat.",
    bmiArtP3: "Consult a healthcare professional for a complete metabolic profile.",
    nutArtTitle: "The Science of Balanced Nutrition",
    nutArtP1: "Nutrition is the pillar of human health, providing building blocks for energy and repair. A balanced diet requires optimal distribution of macro and micronutrients.",
    nutArtP2: "Modern science emphasizes 'Micro-density' alongside calorie goals to stabilize blood glucose and promote long-term cellular health.",
    nutArtP3: "Nutrition is a long-term commitment to biological excellence.",
    symArtTitle: "Digital Triage & Symptom Recognition",
    symArtP1: "Early recognition of physical signals is critical for preventative medicine. Our AI uses advanced neural networks to analyze patterns in these signals.",
    symArtP2: "Digital triage helps categorize the urgency of symptoms, providing a bridge between patient discomfort and clinical intervention.",
    symArtP3: "Listen to your body; it speaks in signals before it shouts in pain.",
    calArtTitle: "Metabolism & Weight Control",
    calArtP1: "Metabolic rate measures the energy required for basic life-sustaining functions. Understanding TDEE is the core of effective weight management.",
    calArtP2: "The thermodynamics of weight control involves more than just numbers; it involves hormonal response and nutrient timing.",
    calArtP3: "Optimize your fuel to optimize your life.",
    exeArtTitle: "Physiological Training Adaptations",
    exeArtP1: "Exercise is a systematic stimulus that triggers profound adaptations. Cardiovascular training strengthens the heart while resistance training builds density.",
    exeArtP2: "Progressive overload is the secret to continuous improvement and injury prevention in any fitness architect model.",
    exeArtP3: "Strong body, resilient mind.",
    conArtTitle: "The Future of AI in Healthcare",
    conArtP1: "Artificial Intelligence is revolutionizing medicine by providing instant access to massive clinical repositories.",
    conArtP2: "The HealthXRay Consultant synthesizes thousands of journals instantly to give you evidence-based guidance.",
    conArtP3: "Collaborative intelligence: Human expertise meets machine speed."
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
    dispatch: "ارسال کریں",
    openTool: "ٹول کھولیں",
    insightsTitle: "میڈیکل جرنل کی بصیرت",
    insightsSub: "تحقیق پر مبنی طبی فضیلت۔",
    readMore: "مکمل مضمون پڑھیں",
    bmiArtTitle: "بی ایم آئی اور میٹابولک صحت",
    bmiArtP1: "بی ایم آئی قد اور وزن کے تناسب سے صحت کا اندازہ لگانے کا ایک سائنسی طریقہ ہے۔",
    bmiArtP2: "صحت مند بی ایم آئی برقرار رکھنا دل کی بیماریوں اور شوگر کے خطرے کو کم کرتا ہے۔",
    bmiArtP3: "طبی مشورے کے لیے ہمیشہ مستند ڈاکٹر سے رجوع کریں۔",
    nutArtTitle: "متوازن غذائیت کی سائنس",
    nutArtP1: "غذائیت انسانی صحت کا ستون ہے، جو توانائی اور خلیوں کی مرمت کے لیے ایندھن فراہم کرتی ہے۔",
    nutArtP2: "جدید سائنس میکرو اور مائیکرو نیوٹرینٹس کی صحیح تقسیم پر زور دیتی ہے۔",
    nutArtP3: "صحیح غذا، صحت مند زندگی۔",
    symArtTitle: "علامات کی پہچان اور تجزیہ",
    symArtP1: "بیماری کے بڑھنے سے پہلے علامات کی پہچان احتیاطی طب کا اہم حصہ ہے۔",
    symArtP2: "اے آئی تشخیصی نظام مریض اور ڈاکٹر کے درمیان ایک پل کا کام کرتا ہے۔",
    symArtP3: "اپنے جسم کے اشاروں کو سنیں اور بروقت فیصلہ کریں۔",
    calArtTitle: "میٹابولزم اور وزن کنٹرول",
    calArtP1: "میٹابولک ریٹ وہ توانائی ہے جو جسم کو بنیادی افعال کے لیے درکار ہوتی ہے۔",
    calArtP2: "وزن کم کرنے کے لیے کیلوریز کی صحیح سمجھ ضروری ہے۔",
    calArtP3: "ایندھن بہتر بنائیں، زندگی بہتر بنائیں۔",
    exeArtTitle: "ورزش کے جسمانی اثرات",
    exeArtP1: "ورزش دل کو مضبوط بناتی ہے اور پٹھوں کی نشوونما میں مدد کرتی ہے۔",
    exeArtP2: "مسلسل بہتری کا راز ورزش کی شدت میں بتدریج اضافہ کرنا ہے۔",
    exeArtP3: "مضبوط جسم، توانا ذہن۔",
    conArtTitle: "ہیلتھ کیئر میں اے آئی کا مستقبل",
    conArtP1: "اے آئی طبی معلومات کے وسیع ذخیرے تک فوری رسائی فراہم کر کے طب کو بدل رہی ہے۔",
    conArtP2: "ہمارا مشیر ہزاروں طبی جرائد سے آپ کو بہترین معلومات فراہم کرتا ہے۔",
    conArtP3: "انسانی تجربہ اور مشین کی رفتار کا بہترین ملاپ۔"
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
    dispatch: "भेजें",
    openTool: "टूल खोलें",
    insightsTitle: "मेडिकल जर्नल इनसाइट्स",
    insightsSub: "अनुसंधान और नैदानिक उत्कृष्टता।",
    readMore: "पूरा लेख पढ़ें",
    bmiArtTitle: "बीएमआई और चयापचय स्वास्थ्य",
    bmiArtP1: "बीएमआई ऊंचाई-से-वजन अनुपात के आधार पर स्वास्थ्य का आकलन करने का एक वैज्ञानिक उपकरण है।",
    bmiArtP2: "स्वस्थ बीएमआई बनाए रखने से मधुमेह और हृदय रोगों का खतरा कम होता है।",
    bmiArtP3: "पूर्ण स्वास्थ्य जांच के लिए डॉक्टर से सलाह लें।",
    nutArtTitle: "संतुलित पोषण का विज्ञान",
    nutArtP1: "पोषण मानव स्वास्थ्य का स्तंभ है, जो ऊर्जा और मरम्मत के लिए आवश्यक तत्व प्रदान करता है।",
    nutArtP2: "आधुनिक विज्ञान मैक्रो और सूक्ष्म पोषक तत्वों के सही संतुलन पर जोर देता है।",
    nutArtP3: "सही पोषण, लंबी उम्र।",
    symArtTitle: "लक्षणों की पहचान और विश्लेषण",
    symArtP1: "बीमारी के गंभीर होने से पहले लक्षणों की पहचान करना अत्यंत महत्वपूर्ण है।",
    symArtP2: "एआई नैदानिक उपकरण रोगी और डॉक्टर के बीच की दूरी को कम करते हैं।",
    symArtP3: "अपने शरीर के संकेतों को सुनें और समय पर कार्य करें।",
    calArtTitle: "चयापचय और वजन नियंत्रण",
    calArtP1: "मेटाबॉलिक रेट वह ऊर्जा है जिसकी शरीर को बुनियादी कार्यों के लिए आवश्यकता होती है।",
    calArtP2: "वजन प्रबंधन के लिए कैलोरी और पोषक तत्वों की सही समझ जरूरी है।",
    calArtP3: "बेहतर ईंधन, बेहतर जीवन।",
    exeArtTitle: "व्यायाम के शारीरिक लाभ",
    exeArtP1: "व्यायाम हृदय को मजबूत बनाता है और मांसपेशियों का निर्माण करता है।",
    exeArtP2: "निरंतर सुधार का रहस्य व्यायाम की तीव्रता को धीरे-धीरे बढ़ाना है।",
    exeArtP3: "मजबूत शरीर, स्वस्थ दिमाग।",
    conArtTitle: "स्वास्थ्य सेवा में एआई का भविष्य",
    conArtP1: "एआई चिकित्सा जानकारी तक त्वरित पहुंच प्रदान करके स्वास्थ्य सेवा में क्रांति ला रहा है।",
    conArtP2: "हमारा सलाहकार हजारों पत्रिकाओं से डेटा एकत्र करके आपको मार्गदर्शन देता है।",
    conArtP3: "मानवीय विशेषज्ञता और मशीन की गति का संगम।"
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