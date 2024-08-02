export interface IProfile {
  id: number;
  username: string;
  avatarUrl: string;
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
