import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from 'langchain/prompts';
import { ConfigService } from '@nestjs/config';
import { SummaryRepositoryPort } from '../../../domain/ports/summary.repository.port';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { z } from 'zod';
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import { pick } from 'lib/pick';

const ResponseSchema = z.object({
  title: z.string(),
  summary: z.string(),
  author: z.string(),
});

@Injectable()
export class SummarizerOpenAiService implements SummaryRepositoryPort {
  private readonly chatOpenAI: ChatOpenAI;

  constructor(configService: ConfigService) {
    this.chatOpenAI = new ChatOpenAI({
      openAIApiKey: configService.getOrThrow('OPENAI_API_KEY'),
      modelName: configService.getOrThrow('OPENAI_MODEL'),
      temperature: parseFloat(configService.getOrThrow('OPENAI_TEMPERATURE')),
    });
  }

  async summarize(
    url: string,
  ): Promise<{ title: string; summary: string; author: string }> {
    const content = await this.getArticleContent(url);

    return ChatPromptTemplate.fromMessages([
      [
        'system',
        `You are a specialist in summarizing articles. 
        When summarizing an article, you will respond with JSON in the form of {{ "title": "string", "summary": "string", "author": "string"}}

        Example: {{ "title": "The title of the article", "summary": "The summary of the article", "author": "The author of the article"}}
        `,
      ],
      ['user', '{input}'],
    ])
      .pipe(this.chatOpenAI)
      .pipe(new StructuredOutputParser(ResponseSchema))
      .invoke({
        input: `The following is an HTML page. Summarize the content in 100 words: ${content}`,
      });
  }

  /**
   * Attempts to use @mozilla/Readability to extract the article content from the given URL
   * to save on token costs and processing time. If Readability fails, the raw HTML is returned.
   */
  private async getArticleContent(url: string): Promise<string> {
    const rawHtmlText = await fetch(url).then((response) => response.text());
    const { document } = new JSDOM(rawHtmlText).window;
    const readerResult = new Readability(document).parse();

    return readerResult
      ? JSON.stringify(pick(readerResult, ['title', 'content', 'byline']))
      : rawHtmlText;
  }
}
