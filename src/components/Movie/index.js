import "./Movie.css";

const Movie = ({ movie: { poster_path, title, vote_average, overview } }) => {
	return (
		<div className="container">
			<div className="card">
				<img
					src={
						poster_path
							? `https://image.tmdb.org/t/p/w500${poster_path}`
							: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.mDzIoaqnw_whAiaTSz4iwgHaFj%26pid%3DApi&f=1"
					}
					alt="results"
					width={130}
					height={190}
				/>
				<div className="text">
					<div className="text-title">
						<div className="movie-title">{title}</div>
						<div className="movie-vote-average">{vote_average}</div>
					</div>
					<div className="movie-overview">{overview}</div>
				</div>
			</div>
		</div>
	);
};

export default Movie;
