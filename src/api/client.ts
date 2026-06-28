// api.ts

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public body: unknown,
  ) {
    super(message);
  }
}

async function parseResponse(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function extractMessage(body: unknown, fallback: string): string {
  if (!body) return fallback;
  if (typeof body === "string") return body;
  if (typeof body === "object" && body !== null) {
    const record = body as Record<string, unknown>;
    if (typeof record.detail === "string") return record.detail;
    if (
      Array.isArray(record.detail) &&
      typeof record.detail[0]?.msg === "string"
    ) {
      return record.detail[0].msg;
    }
  }
  return fallback;
}

interface FetchResult {
  response: Response;
  body: unknown;
}

async function doFetch(
  path: string,
  options: RequestInit,
): Promise<FetchResult> {
  const hasBody = options.body != null;

  const headers: HeadersInit = {
    ...(hasBody ? { "Content-Type": "application/json" } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const body = await parseResponse(response);
  return { response, body };
}

export async function request<T = unknown>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const init: RequestInit = { ...options };

  if (init.body && typeof init.body !== "string") {
    init.body = JSON.stringify(init.body);
  }

  const { response, body } = await doFetch(path, init);

  if (!response.ok) {
    throw new ApiError(
      extractMessage(body, `Request failed (${response.status})`),
      response.status,
      body,
    );
  }

  return body as T;
}
