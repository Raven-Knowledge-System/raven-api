const apiKey = 'fc1e4352-b7f0-45e0-b510-74cb1d68a913';

jest.setTimeout(300000);

// TODO: these tests cost me lots of API money. Figure out how to mock the API.
describe('POST v1/memory/auto', () => {
  it.skip('creates a memory automatically', async () => {
    const url = 'https://pubmed.ncbi.nlm.nih.gov/34365148/';
    const res = await fetch('http://localhost:3000/v1/memory/auto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'corvidae-api-key': apiKey,
      },
      body: JSON.stringify({
        url,
      }),
    });

    expect(await res.json()).toMatchObject({
      uuid: expect.any(String),
      summary: expect.any(String),
      title: expect.any(String),
      url,
    });
  });

  it.skip('returns a 409 if the memory already exists', async () => {
    const url = 'https://pubmed.ncbi.nlm.nih.gov/34365148/';
    const res = await fetch('http://localhost:3000/v1/memory/auto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'corvidae-api-key': apiKey,
      },
      body: JSON.stringify({
        url,
      }),
    });

    expect(res.status).toBe(409);
  });
});
