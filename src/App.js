import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";
import Movie from "./components/Movie";
import { trendingMovies } from "./constants";
function App() {
  const [movies, setMovies] = useState("");

  useEffect(() => {
    axios.get(trendingMovies).then((res) => {
      setMovies(res.data.results);
      console.log(movies);
    });
  }, []);

  return (
    <div className="App">
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
