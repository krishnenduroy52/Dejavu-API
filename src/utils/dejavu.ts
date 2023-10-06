const axios = require("axios");
const { load } = require("cheerio");
// const

require("dotenv").config();

import type {
  IError,
  ITrendingMoviesResponse,
  ITrendingMovie,
  ITrendingTVShowsResponse,
  ITrendingTVShow,
  ILatestMoviesResponse,
} from "../types/dejavu.d.ts";

const BASE_URL: string = process.env.URL || "";
const axiosInstance = axios.create({ baseURL: BASE_URL });

const fetchTrendingMovies = async (): Promise<
  ITrendingMoviesResponse | IError
> => {
  try {
    const { data } = await axiosInstance.get("/home");
    const $ = load(data);

    const movies: ITrendingMovie[] = [];
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
      length: movies.length,
      "buy me a coffee": "https://www.buymeacoffee.com/krishnendu",
    };
  } catch (error) {
    return { error: `We are facing a problem  ${error}` };
  }
};

const fetchTrendingTVShow = async (): Promise<
  ITrendingTVShowsResponse | IError
> => {
  try {
    const { data } = await axiosInstance.get("/home");
    const $ = load(data);

    const tvshow: ITrendingTVShow[] = [];
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
            recent: $filmDetail.find(".fdi-item:last-child").text().trim(),
          },
        });
      }
    );
    return {
      currentPage: 1,
      hasNextPage: false,
      results: tvshow.slice(0, -1),
      length: tvshow.length - 1,
      "buy me a coffee": "https://www.buymeacoffee.com/krishnendu",
    };
  } catch (error) {
    return { error: `We are facing a problem  ${error}` };
  }
};

const fetchLatestMovie = async () : Promise<ILatestMoviesResponse | IError> => {
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
      "buy me a coffee": "https://www.buymeacoffee.com/krishnendu",
    };
  } catch (error) {
    return { error: `We are facing a problem  ${error}` };
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
            recent: $filmDetail.find(".fdi-item:last-child").text().trim(),
          },
        });
      }
    );
    return {
      currentPage: 1,
      hasNextPage: false,
      results: tvshow.slice(0, -1),
      total: tvshow.length - 1,
      "buy me a coffee": "https://www.buymeacoffee.com/krishnendu",
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
            category: $filmDetail.find(".fdi-item strong").text().trim(),
          },
        });
      }
    );
    return {
      currentPage: 1,
      hasNextPage: false,
      results: tvshow.slice(0, -1),
      total: tvshow.length - 1,
      "buy me a coffee": "https://www.buymeacoffee.com/krishnendu",
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
          year: $filmDetail.find(".fdi-item:first-child").text().trim(),
          category: $filmDetail.find(".fdi-item strong").text().trim(),
        },
      });
    });
    return {
      currentPage: page,
      hasNextPage: hasNextPage,
      results: serachResult.slice(0, -1),
      total: serachResult.length - 1,
      "buy me a coffee": "https://www.buymeacoffee.com/krishnendu",
    };
  } catch (error) {
    return { error };
  }
};

const fetchVideo = async () => {
  try {
    const url =
      "https://ww1.m4ufree.tv/watch-yyiby-oppenheimer-2023-movie-online-free-m4ufree.html";

    // Function to fetch and parse the webpage
    const res = await axios.get(url);
    const $ = load(res.data);
    const m3u8Link = $('a[href$=".m3u8"]').attr("href");

    if (m3u8Link) {
      console.log("M3U8 Link:", m3u8Link);
    } else {
      console.log("M3U8 link not found on the page.");
    }
    return { done: "done" };
  } catch (error) {
    return { error };
  }
};

// const fetchVideo = async () => {
//   try {
//     // https://raw.githubusercontent.com/Claudemirovsky/keys/e$type/key
//     // const key = await axios.get(
//     //   "https://raw.githubusercontent.com/Claudemirovsky/keys/e$type/key"
//     // );
//     // console.log(key.data);
//     // return key.data.toString();

//     const { data } = await axios.get(
//       "https://watch-free.tv/fetch/1b675cf?_token=63848622a2bb5"
//     );
//     return data;
//   } catch (error) {
//     return { error };
//   }
// };

const fetchDetailsMovie = async (id: string) => {
  const { data } = await axiosInstance.get(`/movie/${id}`);
  const $ = load(data);

  const detail: any = {
    title: $(".detail_page-watch")
      .find(".heading-name")
      .text()
      .replace(/\n/g, "")
      .trim(),
    img: $(".film-poster > img").attr("data-src"),
    description: $(".detail_page-watch")
      .find(".description")
      .text()
      .split("\n")[2]
      .trim(),
    detail: {
      category: "Movie",
      released: $(".elements")
        .find(".row-line:eq(0)")
        .text()
        ?.split("\n")[1]
        .trim()
        .split(":")[1]
        .trim(),
      genre: $(".elements")
        .find(".row-line:eq(1)")
        .find("a")
        ?.map((_: number, el: cheerio.Element) => $(el).text())
        .get(),
      casts: $(".elements")
        .find(".row-line:eq(2)")
        .find("a")
        ?.map((_: number, el: cheerio.Element) => $(el).text())
        .get(),
      duration: $(".elements")
        .find(".row-line")
        .last()
        .find("a")
        ?.map((_: number, el: cheerio.Element) => $(el).text())
        .get(),

      country: $(".elements").find(".row-line:eq(4)").find("a").text(),
      production: $(".elements")
        .find(".row-line")
        .last()
        .find("a")
        ?.map((_: number, el: cheerio.Element) => $(el).text())
        .get(),
    },
  };

  return {
    result: detail,
    "buy me a coffee": "https://www.buymeacoffee.com/krishnendu",
  };
};

const fetchDetailsTVShow = async (id: string) => {
  const { data } = await axiosInstance.get(`/tv/${id}`);
  const $ = load(data);

  const detail: any = {
    title: $(".detail_page-watch")
      .find(".heading-name")
      .text()
      .replace(/\n/g, "")
      .trim(),
    img: $(".film-poster > img").attr("data-src"),
    description: $(".detail_page-watch")
      .find(".description")
      .text()
      .split("\n")[2]
      .trim(),
    detail: {
      category: "TV",
      released: $(".elements")
        .find(".row-line:eq(0)")
        .text()
        ?.split("\n")[1]
        .trim()
        .split(":")[1]
        .trim(),
      genre: $(".elements")
        .find(".row-line:eq(1)")
        .find("a")
        ?.map((_: number, el: cheerio.Element) => $(el).text())
        .get(),
      casts: $(".elements")
        .find(".row-line:eq(2)")
        .find("a")
        ?.map((_: number, el: cheerio.Element) => $(el).text())
        .get(),
      duration: $(".elements")
        .find(".row-line:eq(3)")
        .text()
        ?.split("\n")[1]
        .trim()
        .split(":")[1]
        .trim(),

      country: $(".elements").find(".row-line:eq(4)").find("a").text(),
      production: $(".elements")
        .find(".row-line")
        .last()
        .find("a")
        ?.map((_: number, el: cheerio.Element) => $(el).text())
        .get(),
    },
  };

  return {
    result: detail,
    "buy me a coffee": "https://www.buymeacoffee.com/krishnendu",
  };
};

// https://megacloud.tv/embed-1/e-1/9JXCOiGwpL8b?z=
export {
  fetchTrendingMovies,
  fetchTrendingTVShow,
  fetchLatestMovie,
  fetchLatestTVShows,
  fetchCommingSoon,
  fetchSearch,
  fetchVideo,
  fetchDetailsMovie,
  fetchDetailsTVShow,
};
