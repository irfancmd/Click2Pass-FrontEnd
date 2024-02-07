import { Question } from './question.models';

export interface Exam {
  id: number;

  q1Id?: number;
  q1Ans?: string;
  q1: Question;

  q2Id?: number;
  q2Ans?: string;
  q2: Question;

  q3Id?: number;
  q3Ans?: string;
  q3: Question;

  q4Id?: number;
  q4Ans?: string;
  q4: Question;

  q5Id?: number;
  q5Ans?: string;
  q5: Question;

  q6Id?: number;
  q6Ans?: string;
  q6: Question;

  q7Id?: number;
  q7Ans?: string;
  q7: Question;

  q8Id?: number;
  q8Ans?: string;
  q8: Question;

  q9Id?: number;
  q9Ans?: string;
  q9: Question;

  q10Id?: number;
  q10Ans?: string;
  q10: Question;

  q11Id?: number;
  q11Ans?: string;
  q11: Question;

  q12Id?: number;
  q12Ans?: string;
  q12: Question;

  q13Id?: number;
  q13Ans?: string;
  q13: Question;

  q14Id?: number;
  q14Ans?: string;
  q14: Question;

  q15Id?: number;
  q15Ans?: string;
  q15: Question;

  q16Id?: number;
  q16Ans?: string;
  q16: Question;

  q17Id?: number;
  q17Ans?: string;
  q17: Question;

  q18Id?: number;
  q18Ans?: string;
  q18: Question;

  q19Id?: number;
  q19Ans?: string;
  q19: Question;

  q20Id?: number;
  q20Ans?: string;
  q20: Question;

  startTime?: Date;
  endTime?: Date;
  examineeId?: number;
  questionCount: number;
  totalScore?: number;
  achievedScore?: number;
  testCompleted?: boolean;
  creationTime: Date;
}
