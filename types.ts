export interface DogPersona {
  breed: string;
  colorName: string;
  hexCode: string;
  personality: string;
  traits: string[];
  quote: string;
  bestMatch: string;
  worstMatch: string;
}

export interface GeneratedData {
  persona: DogPersona;
  imageUrl: string;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: {
    label: string;
    value: string;
  }[];
}

export interface QuizAnswer {
  questionId: number;
  questionText: string;
  answerText: string;
}

export enum AppStep {
  INPUT = 'INPUT',
  LOADING = 'LOADING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}