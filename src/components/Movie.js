import React from "react";

const Movie = ({ image, title, overview, voteAvarage }) => {
  return (
    <div>
      <div>{image}</div>
      <div>{title}</div>
      <div>{overview}</div>
      <div>{voteAvarage}</div>
    </div>
  );
};

export default Movie;
