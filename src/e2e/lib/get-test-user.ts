type User = {
  email: string;
  apiKey: string;
  uuid: string;
};

export async function getTestUser(): Promise<User> {
  const res = await fetch('http://localhost:3000/v1/test/users', {
    method: 'POST',
  });

  return res.json();
}
