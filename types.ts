
export interface RoastSentence {
  text: string;
  source: 'local' | 'ai';
}

export enum RoastLevel {
  MILD = 'MILD',
  SPICY = 'SPICY',
  LEGENDARY = 'LEGENDARY'
}
