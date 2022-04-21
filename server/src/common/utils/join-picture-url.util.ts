import env from '../config/env.config';

const host =
  env.NODE_ENV === 'production' ? 'voteit-api.washnix.com' : '127.0.0.1';

const createJoinPictureUrlFunction =
  (pictureCategory: string) => (pictureId: string | null) =>
    pictureId == null
      ? null
      : `https://${host}:${env.PORT}/media/${pictureCategory}/${pictureId}`;

export const joinPollPictureUrl = createJoinPictureUrlFunction('poll');
