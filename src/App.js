import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import Movie from "./components/Movie";
import { FaSortAmountDownAlt } from "react-icons/fa";
import debounce from "lodash/debounce";
import "./App.css";
const { REACT_APP_API_URL, REACT_APP_API_KEY } = process.env;

function App() {
	const [moviesIds, setMoviesIds] = useState([]);
	const [movies, setMovies] = useState([]);
	const [searchValue, setSearch] = useState("");
	const [sorted, setSorted] = useState(false);

	useEffect(() => {
		axios
			.get(`${REACT_APP_API_URL}/trending/movie/day`, {
				params: { api_key: REACT_APP_API_KEY },
			})
			.then((response) => {
				setMovies(response.data.results);
				setMoviesIds(response.data.results.map((movie) => movie.id));
			});
	}, []);

	const getSearchResults = useCallback(
			debounce((query) => {
				axios
					.get(`${REACT_APP_API_URL}/search/movie`, {
						params: { api_key: REACT_APP_API_KEY, query },
					})
					.then((response) => {
						setMovies(response.data.results);
						setMoviesIds(
							response.data.results.map((movie) => movie.id)
						);
					});
			}, 300),
		[]
	);
	const search = (e) => {
		setSearch(e.target.value);
		getSearchResults(e.target.value);
	};

	const sort = () => {
		if (!sorted) {
			setMovies((movies) =>
				movies.sort((a, b) => a.vote_average - b.vote_average)
			);
		} else {
			setMovies((movies) =>
				movies.sort(
					(a, b) => moviesIds.indexOf(a.id) - moviesIds.indexOf(b.id)
				)
			);
		}
		setSorted((s) => !s);
	};
	return (
		<div className="App">
			<input
				className="search-input"
				value={searchValue}
				onChange={search}
				placeholder="Search a movie"
			/>
			<button className="btn-sort" onClick={sort}>
				<FaSortAmountDownAlt />
			</button>
			{movies.map((movie) => (
				<Movie key={movie.id} movie={movie} />
			))}
		</div>
	);
}

export default App;
