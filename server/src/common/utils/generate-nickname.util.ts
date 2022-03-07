export const generateNickname = (): string =>
  Math.random().toString(36).slice(2, 12);
