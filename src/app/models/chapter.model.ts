import { Lesson } from './lesson.model';

export interface Chapter {
  id: number;
  name: string;
  description?: string;
  creationTime: Date;
  lessons: Lesson[];
}
