const axios = require("axios");
const { load } = require("cheerio");
require("dotenv").config();

const BASE_URL: string = process.env.URL || "https://sflix.is/";
const axiosInstance = axios.create({ baseURL: BASE_URL });

const fetchTrendingMovies = async () => {
  try {
    const { data } = await axiosInstance.get("/home");
    const $ = load(data);

    const movies: any[] = [];
    $("#trending-movies > .film_list > .film_list-wrap > div").each(
      (index: number, element: any) => {
        const $filmDetail = $(element).find(".film-detail");
        movies.push({
          id: $(element).find(".film-poster > a").attr("href")?.split("/")[2],
          title: $(element).find(".film-name > a").text(),
          img: $(element).find(".film-poster > img").attr("data-src"),
          detail: {
            rating: $filmDetail.find(".fdi-item:first-child").text().trim(),
            quality: $filmDetail.find(".fdi-item strong").text().trim(),
            year: $filmDetail.find(".fdi-item:last-child").text().trim(),
          },
        });
      }
    );
    return {
      currentPage: 1,
      hasNextPage: false,
      results: movies.slice(0, -1),
      total: movies.length,
    };
  } catch (error) {
    return { error };
  }
};

const fetchTrendingTVShow = async () => {
  try {
    const { data } = await axiosInstance.get("/home");
    const $ = load(data);

    const tvshow: any[] = [];
    $("#trending-tv > .film_list > .film_list-wrap > div").each(
      (index: number, element: any) => {
        const $filmDetail = $(element).find(".film-detail");
        tvshow.push({
          id: $(element).find(".film-poster > a").attr("href")?.split("/")[2],
          title: $(element).find(".film-name > a").text(),
          img: $(element).find(".film-poster > img").attr("data-src"),
          detail: {
            rating: $filmDetail.find(".fdi-item:first-child").text().trim(),
            quality: $filmDetail.find(".fdi-item strong").text().trim(),
            year: $filmDetail.find(".fdi-item:last-child").text().trim(),
          },
        });
      }
    );
    return {
      currentPage: 1,
      hasNextPage: false,
      results: tvshow.slice(0, -1),
      total: tvshow.length - 1,
    };
  } catch (error) {
    return { error };
  }
};

const fetchLatestMovie = async () => {
  try {
    const { data } = await axiosInstance.get("/home");
    const $ = load(data);

    const tvshow: any[] = [];
    $(".section-id-02:eq(0) > .film_list > .film_list-wrap > div").each(
      (index: number, element: any) => {
        const $filmDetail = $(element).find(".film-detail");
        tvshow.push({
          id: $(element).find(".film-poster > a").attr("href")?.split("/")[2],
          title: $(element).find(".film-name > a").text(),
          img: $(element).find(".film-poster > img").attr("data-src"),
          detail: {
            rating: $filmDetail.find(".fdi-item:first-child").text().trim(),
            quality: $filmDetail.find(".fdi-item strong").text().trim(),
            year: $filmDetail.find(".fdi-item:last-child").text().trim(),
          },
        });
      }
    );
    return {
      currentPage: 1,
      hasNextPage: false,
      results: tvshow.slice(0, -1),
      total: tvshow.length - 1,
    };
  } catch (error) {
    return { error };
  }
};

const fetchLatestTVShows = async () => {
  try {
    const { data } = await axiosInstance.get("/home");
    const $ = load(data);

    const tvshow: any[] = [];
    $(".section-id-02:eq(1) > .film_list > .film_list-wrap > div").each(
      (index: number, element: any) => {
        const $filmDetail = $(element).find(".film-detail");
        tvshow.push({
          id: $(element).find(".film-poster > a").attr("href")?.split("/")[2],
          title: $(element).find(".film-name > a").text(),
          img: $(element).find(".film-poster > img").attr("data-src"),
          detail: {
            rating: $filmDetail.find(".fdi-item:first-child").text().trim(),
            quality: $filmDetail.find(".fdi-item strong").text().trim(),
            year: $filmDetail.find(".fdi-item:last-child").text().trim(),
          },
        });
      }
    );
    return {
      currentPage: 1,
      hasNextPage: false,
      results: tvshow.slice(0, -1),
      total: tvshow.length - 1,
    };
  } catch (error) {
    return { error };
  }
};

const fetchCommingSoon = async () => {
  try {
    const { data } = await axiosInstance.get("/home");
    const $ = load(data);

    const tvshow: any[] = [];
    $(".section-id-02:eq(2) > .film_list > .film_list-wrap > div").each(
      (index: number, element: any) => {
        const $filmDetail = $(element).find(".film-detail");
        tvshow.push({
          id: $(element).find(".film-poster > a").attr("href")?.split("/")[2],
          title: $(element).find(".film-name > a").text(),
          img: $(element).find(".film-poster > img").attr("data-src"),
          detail: {
            rating: $filmDetail.find(".fdi-item:first-child").text().trim(),
            quality: $filmDetail.find(".fdi-item strong").text().trim(),
            year: $filmDetail.find(".fdi-item:last-child").text().trim(),
          },
        });
      }
    );
    return {
      currentPage: 1,
      hasNextPage: false,
      results: tvshow.slice(0, -1),
      total: tvshow.length - 1,
    };
  } catch (error) {
    return { error };
  }
};

const fetchSearch = async ({
  query,
  page = 1,
}: {
  query: string;
  page: number;
}) => {
  if (query === undefined || query === "" || query == null)
    return { error: "No search query provided." };
  try {
    const { data } = await axiosInstance.get(`/search/${query}?page=${page}`);
    const $ = load(data);
    const hasNextPage =
      $(".pagination > li").length > 0
        ? $(".pagination > li").last().hasClass("active")
          ? false
          : true
        : false;
    const serachResult: any[] = [];
    $(".film_list-wrap > div").each((index: number, element: any) => {
      const $filmDetail = $(element).find(".film-detail");
      serachResult.push({
        id: $(element).find(".film-poster > a").attr("href")?.split("/")[2],
        title: $(element).find(".film-name > a").text(),
        img: $(element).find(".film-poster > img").attr("data-src"),
        detail: {
          rating: $filmDetail.find(".fdi-item:first-child").text().trim(),
          quality: $filmDetail.find(".fdi-item strong").text().trim(),
          year: $filmDetail.find(".fdi-item:last-child").text().trim(),
        },
      });
    });
    return {
      currentPage: page,
      hasNextPage: hasNextPage,
      results: serachResult.slice(0, -1),
      total: serachResult.length - 1,
    };
  } catch (error) {
    return { error };
  }
};

export {
  fetchTrendingMovies,
  fetchTrendingTVShow,
  fetchLatestMovie,
  fetchLatestTVShows,
  fetchCommingSoon,
  fetchSearch,
};
