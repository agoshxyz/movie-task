import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";
import { Movie, SearchResult } from "./components/index";
import { trendingMovies, GetUrl, SortResults } from "./constants";
import {
  FaSortAmountDownAlt,
  FaSortAmountUpAlt,
  FaSearch,
} from "react-icons/fa";
function App() {
  const [movies, setMovies] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [trendingAsc, setTrendingAsc] = useState("");
  const [currentScreen, setCurrentScreen] = useState("trending");

  useEffect(() => {
    axios.get(trendingMovies).then((res) => {
      setMovies(res.data.results);
      console.log(res.data.results);
    });
  }, []);

  function GetSearch() {
    if (!search) {
      console.log(movies);
      setCurrentScreen("trending");
    } else {
      setCurrentScreen("searchResults");
      axios.get(GetUrl(search)).then((response) => {
        console.log(response.data);
        setSearchResults(response.data.results);
        console.log(searchResults);
        setSearch("");
      });
    }
  }

  function keyListen(e) {
    if (e.key === "Enter") {
      GetSearch();
    }
  }
  return (
    <div className="App">
      <input
        className="search-input"
        onKeyPress={(e) => keyListen(e)}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Search a movie"
      />
      <button className="search-btn" onClick={() => GetSearch()}>
        Search <FaSearch />{" "}
      </button>
      <button
        className="btn-sort"
        onClick={() => {
          if (currentScreen === "searchResults") {
            let sortedMovie = SortResults(searchResults, "asc");
            console.log(sortedMovie);
            setCurrentScreen("asc");
            setTrendingAsc(sortedMovie);
          } else {
            let sortedMovie = SortResults(movies, "asc");
            console.log(sortedMovie);
            setCurrentScreen("asc");
            setTrendingAsc(sortedMovie);
          }
        }}
      >
        <FaSortAmountDownAlt />
      </button>

      <button
        className="btn-sort"
        onClick={() => {
          if (currentScreen === "searchResults") {
            let sortedMovie = SortResults(searchResults, "desc");
            console.log(sortedMovie);
            setCurrentScreen("desc");
            setTrendingAsc(sortedMovie);
          } else {
            let sortedMovie = SortResults(movies);
            console.log(sortedMovie);
            setCurrentScreen("desc");
            setTrendingAsc(sortedMovie);
          }
        }}
      >
        <FaSortAmountUpAlt />
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
      {currentScreen === "asc" &&
        trendingAsc &&
        trendingAsc.map((movies, index) => {
          return (
            <div key={index}>
              <SearchResult
                imageURL={movies.poster_path}
                title={movies.title}
                overview={movies.overview}
                voteAvarage={movies.vote_average}
              />
            </div>
          );
        })}

      {currentScreen === "desc" &&
        trendingAsc &&
        trendingAsc.map((movies, index) => {
          return (
            <div key={index}>
              <SearchResult
                imageURL={movies.poster_path}
                title={movies.title}
                overview={movies.overview}
                voteAvarage={movies.vote_average}
              />
            </div>
          );
        })}
    </div>
  );
}

export default App;
