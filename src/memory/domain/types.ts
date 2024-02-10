export const MemoryTypes = <const>{
  Book: 'book',
  Article: 'article',
  Podcast: 'podcast',
};

export type MemoryType = (typeof MemoryTypes)[keyof typeof MemoryTypes];
