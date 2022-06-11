import React from "react";
import "./Movie.css";
const Movie = ({ imageURL, title, overview, voteAvarage }) => {
  return (
    <div className="container">
      <div className="card">
        <img
          src={`https://image.tmdb.org/t/p/w500${imageURL}`}
          alt="results"
          width={130}
          height={190}
        />
        <div className="text">
          <div className="text-title">
          <div className="movie-title">{title}</div>
            <div className="movie-vote-average">{voteAvarage}</div>
          </div>
          <div className="movie-overview">{overview}</div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
