type JwtPayload = {
  sub?: unknown;
};

function padBase64(base64: string): string {
  const pad = base64.length % 4;
  if (pad === 0) return base64;
  if (pad === 2) return `${base64}==`;
  if (pad === 3) return `${base64}=`;
  return base64;
}

function decodeBase64Url(input: string): string | null {
  try {
    const base64 = padBase64(input.replace(/-/g, '+').replace(/_/g, '/'));

    if (typeof atob === 'function') {
      return atob(base64);
    }

    const maybeBuffer = (globalThis as unknown as {
      Buffer?: { from: (s: string, enc: string) => { toString: (enc: string) => string } };
    }).Buffer;

    if (maybeBuffer?.from) {
      return maybeBuffer.from(base64, 'base64').toString('utf-8');
    }

    return null;
  } catch {
    return null;
  }
}

export function getJwtSubject(token: string | null): string | null {
  if (!token) return null;

  const parts = token.split('.');
  if (parts.length < 2) return null;

  const decoded = decodeBase64Url(parts[1] ?? '');
  if (!decoded) return null;

  try {
    const payload = JSON.parse(decoded) as JwtPayload;
    return typeof payload.sub === 'string' ? payload.sub : null;
  } catch {
    return null;
  }
}
