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

export type ILatestMoviesResponse = {
  currentPage: number;
  hasNextPage: boolean;
  results: ILatestMovie[];
  total: number;
  "buy me a coffee": string;
};

export type ILatestMovie = {
  id: string;
  title: string;
  img: string;
  detail: {
    rating: string;
    quality: string;
    year: string;
  };
};

export type ILatestTVShowsResponse = {
  currentPage: number;
  hasNextPage: boolean;
  results: ILatestTVShow[];
  total: number;
  "buy me a coffee": string;
};

export type ILatestTVShow = {
  id: string;
  title: string;
  img: string;
  detail: {
    rating: string;
    quality: string;
    recent: string;
  };
};

export type ICommingSoon = {
  id: string;
  title: string;
  img: string;
  detail: {
    rating: string;
    category: string;
  };
};

export type ICommingSoonResponse = {
  currentPage: number;
  hasNextPage: boolean;
  results: ICommingSoon[];
  total: number;
  "buy me a coffee": string;
};

export type ISearch = {
  id: string;
  title: string;
  img: string;
  detail: {
    year: string;
    category: string;
  };
};

export type ISearchResponse = {
  currentPage: number;
  hasNextPage: boolean;
  results: ISearch[];
  total: number;
  "buy me a coffee": string;
};

export type IDetailsMovie = {
  id: string;
  title: string;
  img: string;
  description: string;
  details: {
    category: string;
    released: string;
    genere: string[];
    casts: string[];
    duration: string;
    country: string;
    production: string[];
  };
};

export type IDetailsMovieResponse = {
  result: IDetailsMovie;
  "buy me a coffee": string;
};

export type IDetailsTVShow = {
  id: string;
  title: string;
  img: string;
  description: string;
  detail: {
    category: string;
    released: string;
    genere: string[];
    casts: string[];
    duration: string;
    country: string;
    production: string[];
  };
};

export type IDetailsTVShowResponse = {
  result: IDetailsTVShow;
  "buy me a coffee": string;
};
