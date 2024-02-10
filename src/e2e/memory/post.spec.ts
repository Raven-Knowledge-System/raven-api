describe('POST v1/memory/', () => {
  const apiKey = 'fc1e4352-b7f0-45e0-b510-74cb1d68a913';
  it('saves a memory', async () => {
    const saved = await fetch('http://localhost:3000/v1/memory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'corvidae-api-key': apiKey,
      },
      body: JSON.stringify({
        url: 'https://example.com',
        title: 'A title',
        summary: 'Some content',
      }),
    });

    expect(await saved.json()).toMatchObject({
      uuid: expect.any(String),
      summary: 'Some content',
      title: 'A title',
      url: 'https://example.com',
    });
  });
});
