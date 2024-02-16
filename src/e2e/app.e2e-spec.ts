describe('AppController (e2e)', () => {
  it('GET /v1)', async () => {
    const res = await fetch('http://localhost:3000/v1');

    expect(res.status).toBe(200);
  });
});
