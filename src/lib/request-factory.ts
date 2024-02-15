export class RequestClient {
  private constructor(
    private readonly baseUrl: string,
    private readonly customHeaders?: Record<string, unknown>,
  ) {}

  static create(
    baseUrl: string,
    customHeaders: Record<string, unknown> = {},
  ): RequestClient {
    return new RequestClient(baseUrl, customHeaders || {});
  }
  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...this.customHeaders,
      },
    });
    return response.json();
  }

  async post<T>(path: string, body: Record<string, unknown>): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.customHeaders,
      },
      body: JSON.stringify(body),
    });

    return response.json();
  }

  async delete(path: string): Promise<Response> {
    return fetch(`${this.baseUrl}${path}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...this.customHeaders,
      },
    });
  }
}
