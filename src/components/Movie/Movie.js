import React from "react";
import "./Movie.css";
const Movie = ({ imageURL, title, overview, voteAvarage }) => {
  return (
    <div className="container">
      <div className="card">
        <img src={`https://image.tmdb.org/t/p/w500${imageURL}`} alt="results" width={90} height={120} />
        <div className="text">
          {" "}
          <div className="">{title}</div>
          <div>{overview}</div>
          <div>{voteAvarage}</div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
