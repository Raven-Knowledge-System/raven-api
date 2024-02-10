describe('GET v1/memory', () => {
  const apiKey = 'fc1e4352-b7f0-45e0-b510-74cb1d68a913';

  it('list all memories', async () => {
    await Promise.all([
      fetch('http://localhost:3000/v1/memory', {
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
      }),
      fetch('http://localhost:3000/v1/memory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'corvidae-api-key': apiKey,
        },
        body: JSON.stringify({
          url: 'https://example.com/another',
          title: 'A title',
          summary: 'Some content',
        }),
      }),
    ]);

    const res = await fetch('http://localhost:3000/v1/memory', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'corvidae-api-key': apiKey,
      },
    });

    const memories = await res.json();
    expect(memories).toHaveLength(2);

    // fetch to delete previous articles
    await Promise.all(
      memories.map((memory: { uuid: string }) =>
        fetch(`http://localhost:3000/v1/memory/${memory.uuid}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'corvidae-api-key': apiKey,
          },
        }),
      ),
    );
  });
});
