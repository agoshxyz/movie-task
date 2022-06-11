const api_key = `09d7e4ead1bd7096e0f4b6c56da951a8`;

export const trendingMovies = `https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`;
export const GetUrl = (search)=> `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${search}&page=1&include_adult=false`

export function SortResults(movie,type){

    for(let i = 0; i<movie.length; i++){
        for(let j = i+1; j<movie.length; j++){
            if(type==='asc'){
                if(movie[i].vote_average<movie[j].vote_average){
                    let temp = movie[i];
                    movie[i] = movie[j];
                    movie[j] = temp;
                }
            }
            else{
                if(movie[i].vote_average>movie[j].vote_average){
                    let temp = movie[i];
                    movie[i] = movie[j];
                    movie[j] = temp;
                }
            }
        }
    }

    return movie;
}