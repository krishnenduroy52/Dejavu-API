export type IError = {
  error: string;
};

export type ITrendingMoviesResponse = {
  currentPage: number;
  hasNextPage: boolean;
  results: ITrendingMovie[];
  length: number;
  "buy me a coffee": string;
};

export type ITrendingMovie = {
  id: string;
  title: string;
  img: string;
  detail: {
    rating: string;
    quality: string;
    year: string;
  };
};

export type ITrendingTVShowsResponse = {
  currentPage: number;
  hasNextPage: boolean;
  results: ITrendingTVShow[];
  length: number;
  "buy me a coffee": string;
};

export type ITrendingTVShow = {
  id: string;
  title: string;
  img: string;
  detail: {
    rating: string;
    quality: string;
    recent: string;
  };
};
