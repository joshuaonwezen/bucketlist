import type { Question } from './question.interface';

export interface Category {
	name: string;
	type: string;
	question: Record<string, Question>[];
}
