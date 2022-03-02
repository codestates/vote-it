import env from './env.config';

const host = env.NODE_ENV === 'production' ? 'voteit.washnix.com' : '127.0.0.1';

export const POLL_PICTURE_URL = `https://${host}:${env.PORT}/media/poll`;
export const USER_PICTURE_URL = `https://${host}:${env.PORT}/media/user`;
