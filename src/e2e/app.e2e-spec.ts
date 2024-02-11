describe.skip('AppController (e2e)', () => {
  it('/ (GET)', async () => {
    // convet to node-fetch
    const res = await fetch('http://localhost:3000/v1/');
    expect(res.status).toBe(200);
  });
});
