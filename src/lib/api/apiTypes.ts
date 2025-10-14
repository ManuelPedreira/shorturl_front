export type CreateURLRequest = {
  url: string;
};

export type CreateURLResponse = {
  shortCode: string;
  originalUrl: string;
  shortUrl: string;
};
