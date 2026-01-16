
export interface HealthArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  content: string;
  imageUrl: string;
}

export interface NutritionPlan {
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string[];
  tips: string[];
}

export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  intensity: string;
  duration: string;
  restPeriod: string;
  instruction: string;
}

export interface WorkoutPlan {
  routineName: string;
  exercises: Exercise[];
  warmup: string;
  cooldown: string;
  proTips: string[];
}

export interface BMIResult {
  score: number;
  category: string;
  advice: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}
