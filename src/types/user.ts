export interface UserQueryProps {
  id?: string;
  name?: string;
  email?: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface ListUsersData {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export type ListUsersResponse = ListUsersData[];
