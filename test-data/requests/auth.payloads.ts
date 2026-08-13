export interface AuthPayload {
  email?: string;
  password?: string;
}

export function createAuthPayload({ email, password }: AuthPayload = {}): AuthPayload {
  return {
    ...(email !== undefined && { email }),
    ...(password !== undefined && { password }),
  };
}
