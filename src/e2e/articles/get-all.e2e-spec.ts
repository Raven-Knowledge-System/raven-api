import { getTestUser } from 'e2e/lib/get-test-user';
import { RequestClient } from 'lib/request';

describe('GET v1/memories/articles', () => {
  let user: { uuid: string; apiKey: string };
  let requestClient: RequestClient;

  beforeAll(async () => {
    user = await getTestUser();

    requestClient = RequestClient.create('http://localhost:3000', {
      'raven-api-key': user.apiKey,
    });
  });

  afterAll(async () => {
    await requestClient.delete(`/v1/test/users/${user.uuid}`);
  });

  it('list all memories', async () => {
    await Promise.all([
      requestClient.post('/v1/memories/articles', {
        url: 'https://example.com/1',
        title: 'A title',
        summary: 'Some content',
        author: 'Edgar Allan Poe',
      }),
      requestClient.post('/v1/memories/articles', {
        url: 'https://example.com/2',
        title: 'A title',
        summary: 'Some content',
        author: 'Edgar Allan Poe',
      }),
      requestClient.post('/v1/memories/articles', {
        url: 'https://example.com/3',
        title: 'A title',
        summary: 'Some content',
        author: 'Edgar Allan Poe',
      }),
    ]);

    const articles = await requestClient.get<{ uuid: string }[]>(
      '/v1/memories/articles',
    );

    expect(articles).toHaveLength(3);

    await Promise.all(
      articles.map((article) =>
        requestClient.delete(`/v1/memories/articles/${article.uuid}`),
      ),
    );
  });
});
