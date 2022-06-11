const api_key = `09d7e4ead1bd7096e0f4b6c56da951a8`;

export const trendingMovies = `https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`;
export const GetUrl = (search)=> `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${search}&page=1&include_adult=false`
