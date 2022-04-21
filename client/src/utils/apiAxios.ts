import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'https://localhost:8000';

/* TODO:
 * 타입들 프로퍼티 수정
 * 타입들 파일 경로 이동
 */

export interface User {
  nickname: string;
}

export interface Poll {
  id: number;
  createdAt: string;
  subject: string;
  expirationDate: string;
  author: User;
  picture: string | null;
  participatedCount: number;
}

const apiAxios = axios.create({
  baseURL,
  timeout: 5000,
});

export const Polls = {
  async getPagination(
    limit: number,
    cursor?: number,
    query?: string,
  ): Promise<{ polls: Poll[]; nextCursor: number | undefined }> {
    const res = await apiAxios.get('/polls', {
      params: { limit, cursor, query },
    });
    return res.data;
  },
};

export default apiAxios;
