export abstract class SummaryRepositoryPort {
  abstract summarize(link: string): Promise<{ title: string; summary: string }>;
}
