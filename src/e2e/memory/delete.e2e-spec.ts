describe.skip('DELETE v1/memory/{uuid}', () => {
  const apiKey = 'fc1e4352-b7f0-45e0-b510-74cb1d68a913';

  it('should delete a memory', async () => {
    const saved = await fetch('http://localhost:3000/v1/memory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'corvidae-api-key': apiKey,
      },
      body: JSON.stringify({
        url: 'https://example.com/1',
        title: 'A title',
        summary: 'Some content',
      }),
    });

    const uuid = (await saved.json()).uuid;

    const res = await fetch(`http://localhost:3000/v1/memory/${uuid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'corvidae-api-key': apiKey,
      },
    });
    expect(res.status).toBe(204);
  });
});
