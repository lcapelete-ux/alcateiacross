export interface Category {
  id: string;
  name: string;
  gender: 'M' | 'F' | 'Open';
  price: number;
  description: string;
  standards?: string[];
  maxSpots: number;
  active: boolean;
}

export interface Athlete {
  id: string;
  name: string;
  cpf: string;
  email: string;
  whatsapp: string;
  box: string;
  gender: 'M' | 'F';
  categoryId: string;
  tshirtSize: 'P' | 'M' | 'G' | 'GG' | 'XGG';
  emergencyContact: string;
  emergencyPhone: string;
  paymentStatus: 'pendente' | 'pago';
  paymentDate?: string;
  paymentProofUrl?: string;
  paymentProofText?: string;
  registrationDate: string;
}

export interface Workout {
  id: string;
  number: number;
  title: string;
  type: 'for_time' | 'amrap' | 'max_weight';
  scoreTypeDesc: string;
  description: string;
  timeCap: string;
}

export interface WorkoutScore {
  athleteId: string;
  workoutId: string;
  scoreText: string;
  scoreNumeric: number; // for automated sorting
  rank?: number;
  points?: number;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  tag: 'Briefing' | 'WOD' | 'Cronograma' | 'Avisos' | 'Regulamento';
  summary: string;
  content: string;
  author: string;
  important?: boolean;
}
