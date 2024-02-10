describe('POST v1/memory/', () => {
  const apiKey = 'fc1e4352-b7f0-45e0-b510-74cb1d68a913';
  it('saves a memory', async () => {
    const res = await fetch('http://localhost:3000/v1/memory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'corvidae-api-key': apiKey,
      },
      body: JSON.stringify({
        url: 'https://example.com/blah',
        title: 'A title',
        summary: 'Some content',
      }),
    });

    const saved = await res.json();
    expect(saved).toMatchObject({
      uuid: expect.any(String),
      summary: 'Some content',
      title: 'A title',
      url: 'https://example.com/blah',
    });

    // fetch to delete previous article

    await fetch(`http://localhost:3000/v1/memory/${saved.uuid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'corvidae-api-key': apiKey,
      },
    });
  });
});
