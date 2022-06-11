import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";
import { Movie, SearchResult } from "./components/index";
import { trendingMovies, GetUrl } from "./constants";
function App() {
  const [movies, setMovies] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [currentScreen, setCurrentScreen] = useState("trending");

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
      <button
        onClick={() => {
          if (!search) {
            setCurrentScreen("trending");
          } else {
            setCurrentScreen("searchResults");
            axios.get(GetUrl(search)).then((response) => {
              console.log(response.data);
              setSearchResults(response.data.results);
              console.log(searchResults);
            });
          }
        }}
      >
        Search
      </button>

      {currentScreen === "trending" &&
        movies &&
        movies.map((movie, index) => {
          return (
            <div key={index}>
              <Movie
                imageURL={movie.poster_path}
                title={movie.title}
                overview={movie.overview}
                voteAvarage={movie.vote_average}
              />
            </div>
          );
        })}
      {currentScreen === "searchResults" &&
        searchResults &&
        searchResults.map((searchResult, index) => {
          return (
            <div key={index}>
              <SearchResult
                imageURL={searchResult.poster_path}
                title={searchResult.title}
                overview={searchResult.overview}
                voteAvarage={searchResult.vote_average}
              />
            </div>
          );
        })}
    </div>
  );
}

export default App;
