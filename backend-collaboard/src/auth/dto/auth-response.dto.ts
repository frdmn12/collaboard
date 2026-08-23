// These describe the SHAPE of `data` — the interceptor wraps this
// automatically into { success, data, meta }. Controllers and services
// return this directly, never the wrapped shape.

export class RegisterResponseDto {
  id!: string;
  email!: string;
}

export class LoginResponseDto {
  accessToken!: string;
  user!: {
    id: string;
    name: string;
    email: string;
  };
}

export class RefreshResponseDto {
  accessToken!: string;
}
