//TMDB variables
const API_URL = "https://api.themoviedb.org/3";
const IMAGES_URL = "https://image.tmdb.org/t/p";
const API_KEY = "ac8ffc0eba4faf52fa1a6b66f2ea86e0";
const ANIMATION_MOVIES_IDS = "16,10751";

const body = document.querySelector("body");

//navbar variables
const $navbar = document.querySelector("header nav");
const $searchIcon = document.querySelector(".nav__searchIcon");
const $searxhInput = document.querySelector(".nav__searchBar");

//highlight Variables
const $highlight = document.querySelector(".highlight");
import horlogeIcon from "../assets/icons/horloge.svg";
import playIcon from "../assets/icons/play.png";

// movies variables
const $movies_container = document.querySelector(".movies__container");

//Toggle searchbar
$searchIcon.addEventListener("click", () => {
  $searxhInput.classList.toggle("active");
});

//handle navbar background color on different screen
window.addEventListener("scroll", () => {
  if (window.scrollY >= 33) {
    $navbar.classList.add("nav__background");
  } else {
    $navbar.classList.remove("nav__background");
  }
});

let getMovies = (categorie, genderId) => {
  fetch(
    `${API_URL}/discover/${categorie}?api_key=${API_KEY}&with_genres=${genderId}&sort_by=popularity.desc`
  )
    .then((response) => response.json())
    .then((response) => handleMovies(response));
};

let getMovie = async (id) => {
  return await fetch(
    `${API_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
  )
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      return responseData;
    });
};

let handleMovies = (movies) => {
  console.log(movies);
  if (movies.total_results === 0) {
    return;
  }
  showHighlight(movies.results[0].id);
  showMovies(movies);
};

let showHighlight = (movieId) => {
  getMovie(movieId).then((movie) => {
    console.log(movie);
    $highlight.style.background = `rgba(18,31,68,0.7) url( ${IMAGES_URL}/w1280${movie.backdrop_path} )`;
    $highlight.style.backgroundPosition = "center";
    $highlight.style.backgroundSize = "cover";

    let genders = movie.genres.map((genre) => {
      return `<span class="highlight__gender">${genre.name} </span>`;
    });

    let duration = (runtime) => {
      let nHours = Math.floor(runtime / 60);
      let nMin = runtime % 60;
      return `${nHours}h : ${nMin} mn`;
    };

    $highlight.innerHTML = `
    <div class="highlight__content">
        <img class="highlight__contentPoster" src="${IMAGES_URL}/w500${
      movie.poster_path
    }" alt="${movie.title}">
        <div class="highlight__info">
        <span class="highlight__releasedYear">
        ${new Date(movie.release_date).getFullYear()}
        </span>
        <h1 class="highlight__title">${movie.original_title}</h1>
        <div class="highlight__genders">
          ${genders}
        </div>
        <P class="highlight__overview">${movie.overview}</P>
        <div class="highlight__additionalInfo">
          <span class="highlight__duration">
            <img src="${horlogeIcon}" alt="horloge icon"> 
             ${duration(movie.runtime)}
          </span>
          <span class="highlight__rate">TMDB : ${movie.vote_average}</span>
        </div>
        <buttton class="highlight__btn"> 
          <img src="${playIcon}" alt="play icon">  Bande annonce
        </buttton>
        </div>
      </div>`;
    const $highlight__btn = document.querySelector(".highlight__btn");
    $highlight__btn.addEventListener("click", () => {
      showtrailer(movie.videos.results[0].key);
    });
  });
};

function showMovies(movies) {
  let $list = document.createElement("div");
  $list.setAttribute("class", "movie__list");

  movies.results.forEach(function (movie) {
    const div = document.createElement("div");
    div.setAttribute("class", "movie");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const span = document.createElement("span");
    img.setAttribute("src", `${IMAGES_URL}/w300${movie.poster_path}`);
    h2.textContent = movie.title;
    h2.setAttribute("class", "movie__name");
    span.textContent = new Date(movie.release_date).getFullYear();
    span.setAttribute("class", "movie__releaseDate");
    div.appendChild(img);
    div.appendChild(h2);
    div.appendChild(span);
    $list.appendChild(div);
  });
  $movies_container.appendChild($list);
}

let showtrailer = (id) => {
  console.log(id);
  let div = document.createElement("div");
  div.className = "trailer__content";
  div.innerHTML = `
    <span class="close_trailer">X</span>
    <iframe class="trailer__player" width="420" height="315"
    src="https://www.youtube.com/embed/${id}">
    </iframe>
  `;
  body.appendChild(div);
  const close_trailer = document.querySelector(".close_trailer");
  close_trailer.addEventListener("click", () => {
    body.removeChild(div);
  });
};

getMovies("movie", ANIMATION_MOVIES_IDS);
