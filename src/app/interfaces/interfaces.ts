export interface IProfile {
  id: number;
  username: string;
  avatarUrl: string | null;
  subscribersAmount: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
  stack: string[];
  city: string;
  description: string;
}
export interface IAuthToken {
  access_token: string;
  refresh_token: string;
}
export interface IPagable<T> {
  items: T[];
  page: number;
  pages: number;
  size: number;
  total: number;
}
