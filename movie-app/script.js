
// get el
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI ="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


// call function to init
getMovies(APIURL);



async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);
    showMovie(respData.results)
}


// show the movie 
function showMovie(movies) {
    if(!movies || !movies.length ) return;
    main.innerHTML = "";

    movies.forEach(movie => {
        const movieEL = document.createElement("div");
        movieEL.classList.add("movie");

        movieEL.innerHTML = `
            <img src="${IMGPATH + movie.poster_path}" 
                 alt="${movie.title}"
            />

            <div class="movie-info">
                <h3>${movie.title}</h3>
                <span class="${getClassByRate(movie.vote_average)}">${parseFloat(movie.vote_average).toFixed(1)}</span>
            </div>

            <div class= "overview">
                <h3>Overview:</h3> ${movie.overview}
            </div>    
        `;
        main.appendChild(movieEL);
    });
}

function getClassByRate(vote) {
    if (vote > 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'yellow';
    } else {
        return 'red'
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }

});
