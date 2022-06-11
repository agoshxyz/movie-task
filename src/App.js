import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";
import Movie from "./components/Movie";
import { trendingMovies, GetUrl } from "./constants";
function App() {
  const [movies, setMovies] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(trendingMovies).then((res) => {
      setMovies(res.data.results);
      console.log(movies);
    });
  }, []);

  return (
    <div className="App">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="search"
      />
      <div
        onClick={() => {
          axios.get(GetUrl(search)).then((response) => {
            console.log(response.data);
          });
        }}
      >
        hello
      </div>

      {movies &&
        movies.map((movie, index) => {
          return (
            <div key={index}>
              <Movie
                image={movie.backdrop_path}
                title={movie.title}
                overview={movie.overview}
                voteAvarage={movie.vote_average}
              />
            </div>
          );
        })}
    </div>
  );
}

export default App;
