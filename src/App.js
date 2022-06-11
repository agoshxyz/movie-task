import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import Movie from "./components/Movie"; // component has name index.js, which can be ommited
import { FaSortAmountDownAlt } from "react-icons/fa";
import debounce from "lodash/debounce"; // I have imported debounce from lodash, altough the same effect could be achieved using useEffect and setTimeout
import "./App.css";
const { REACT_APP_API_URL, REACT_APP_API_KEY } = process.env;
// common pattern is to store these values inside .env, which is usually in .gitignore, so every developer can have his own .env file with these credentials and keys

function App() {
	const [moviesIds, setMoviesIds] = useState([]);
	const [movies, setMovies] = useState([]);
	const [searchValue, setSearch] = useState("");
	const [sorted, setSorted] = useState(false); // is not neccessary, but for future styling of the buttons

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
			// if users types another character withing 300ms, this function will not run
			// so user has to make a time gap between letters in order to load movies
		}, 300),
		[]
	);
	const search = (e) => {
		setSearch(e.target.value); // changing the state
		getSearchResults(e.target.value); // calling debounced functions
	};

	const sort = () => {
		if (!sorted) {
			setMovies((movies) =>
				// sorts items by their vote_average decreasing => b-a
        // increasing would be a-b
				movies.sort((a, b) => b.vote_average - a.vote_average)
			);
		} else {
			// copy of original movies stores only IDs in order to have web app fast if lots of movies are loaded(which doesn't happen in this example)
			// sorts by position of movies the original array
			setMovies((movies) =>
				movies.sort(
					(a, b) => moviesIds.indexOf(a.id) - moviesIds.indexOf(b.id) // comparing original positions of movies
				)
			);
		}
		// I am settings it after the sorting, because setting state is not completely synchronous and may result in later bugs
		setSorted((s) => !s);
	};
	return (
		<div className="App">
			<input
				className="search-input"
				value={searchValue}
				onChange={search} // you don't have to use (e) => search(e) | e is the default
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
