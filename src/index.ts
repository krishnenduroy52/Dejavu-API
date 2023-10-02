const express = require("express");
const cors = require("cors");
import {
  fetchTrendingMovies,
  fetchTrendingTVShow,
  fetchLatestMovie,
  fetchLatestTVShows,
  fetchCommingSoon,
  fetchSearch,
  fetchVideo,
  fetchDetailsMovie,
  fetchDetailsTVShow,
} from "./utils/Functions";

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: true,
  credentials: true,
  port: PORT,
};
app.use(cors(corsOptions));

app.get("/", (req: any, res: any) => {
  const homeinfo = {
    message: "Welcome to the DejaVu API! 🎉",
    "endpoints(Working)": [
      "/trending-movies",
      "/trending-tv-shows",
      "/latest-movies",
      "/latest-tv-shows",
      "/comming-soon",
      "/search/{MOVIE_NAME}?page={PAGE_NUMBER}",
      "/details/movie/:id",
    ],
    "endpoints(Under Development)": ["/details/tv/:id"],
    "endpoints(Not Working :) Pain in my ass)": ["/watch/:id"],
    "buy me a coffee": "https://www.buymeacoffee.com/krishnendu",
    "github-Link": "https://github.com/krishnenduroy52/movwatch-api",
  };
  res.status(200).send(homeinfo);
});

app.get("/trending-movies", async (req: any, res: any) => {
  try {
    const data = await fetchTrendingMovies();
    if ("error" in data) {
      return res
        .status(400)
        .send({ error: `Some error occurred: ${data.error}` });
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Some error occurred: ${error}`);
  }
});

app.get("/trending-tv-shows", async (req: any, res: any) => {
  try {
    const data = await fetchTrendingTVShow();
    if ("error" in data) {
      return res
        .status(400)
        .send({ error: `Some error occurred: ${data.error}` });
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Some error occurred: ${error}`);
  }
});

app.get("/latest-movies", async (req: any, res: any) => {
  try {
    const data = await fetchLatestMovie();
    if ("error" in data) {
      return res
        .status(400)
        .send({ error: `Some error occurred: ${data.error}` });
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Some error occurred: ${error}`);
  }
});

app.get("/latest-tv-shows", async (req: any, res: any) => {
  try {
    const data = await fetchLatestTVShows();
    if ("error" in data) {
      return res
        .status(400)
        .send({ error: `Some error occurred: ${data.error}` });
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Some error occurred: ${error}`);
  }
});

app.get("/comming-soon", async (req: any, res: any) => {
  try {
    const data = await fetchCommingSoon();
    if ("error" in data) {
      return res
        .status(400)
        .send({ error: `Some error occurred: ${data.error}` });
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Some error occurred: ${error}`);
  }
});
app.get("/search/:query", async (req: any, res: any) => {
  try {
    const { query } = req.params;
    const page: number = parseInt(req.query?.page as string) || 1;
    const data = await fetchSearch({ query, page });

    return res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Some error occurred: ${error}`);
  }
});

app.get("/test-video", async (req: any, res: any) => {
  try {
    const data = await fetchVideo();
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Some error occurred: ${error}`);
  }
});

app.get("/details/movie/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const data = await fetchDetailsMovie(id);
    if ("error" in data) {
      return res
        .status(400)
        .send({ error: `Some error occurred: ${data.error}` });
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Some error occurred: ${error}`);
  }
});

app.get("/details/tv/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const data = await fetchDetailsTVShow(id);
    if ("error" in data) {
      return res
        .status(400)
        .send({ error: `Some error occurred: ${data.error}` });
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Some error occurred: ${error}`);
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
