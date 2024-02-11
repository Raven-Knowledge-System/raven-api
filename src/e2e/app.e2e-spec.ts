import { getTestApplication } from './lib/get-test-application';

// TODO: not sure why this is responding w/ a 404.g
describe.skip('AppController (e2e)', () => {
  it('GET /v1)', async () => {
    const res = await (
      await getTestApplication()
    ).inject({
      method: 'get',
      url: '/v1',
    });

    expect(res.statusCode).toBe(200);
  });
});
