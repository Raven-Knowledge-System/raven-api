import { getTestUser } from 'e2e/lib/get-test-user';
import { RequestClient } from 'lib/request';

describe('POST v1/memory/articles', () => {
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

  it('saves a memory', async () => {
    const saved = await requestClient.post<{ uuid: string }>(
      '/v1/memories/articles',
      {
        url: 'https://example.com/1',
        title: 'A title',
        summary: 'Some content',
        author: 'Edgar Allan Poe',
      },
    );

    expect(saved).toMatchObject({
      uuid: expect.any(String),
      url: 'https://example.com/1',
      title: 'A title',
      summary: 'Some content',
      author: 'Edgar Allan Poe',
    });

    await requestClient.delete(`/v1/memories/articles/${saved.uuid}`);
  });
});
