export interface IPost {
  id: number;
  page?: number;
  subject: string;
  author: string;
  isPrivate?: boolean;
  createdAt: string;
  expirationDate: string;
  picture: string | null;
}
