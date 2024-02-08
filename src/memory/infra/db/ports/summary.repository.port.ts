export abstract class SummaryRepositoryPort {
  abstract summarize(url: string): Promise<{ title: string; summary: string }>;
}
