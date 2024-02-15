import { getTestUser } from 'e2e/lib/get-test-user';
import { RequestClient } from 'lib/request';

describe('DELETE v1/memory/articles/{uuid}', () => {
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

  it('should delete a memory', async () => {
    const savedMemory = await requestClient.post<{ uuid: string }>(
      '/v1/memories/articles',
      {
        url: 'https://example.com/1',
        title: 'A title',
        summary: 'Some content',
        author: 'Edgar Allan Poe',
      },
    );

    const res = await requestClient.delete(
      `/v1/memories/articles/${savedMemory.uuid}`,
    );

    expect(res.status).toBe(204);
  });
});
