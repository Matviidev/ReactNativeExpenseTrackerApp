export interface User {
  id: string;
  name: string;
  email: string;
  profile_picture?: string | null;
  created_at: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface RegisterPayload extends Credentials {
  name: string;
}
