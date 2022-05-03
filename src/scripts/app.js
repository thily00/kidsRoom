//TMDB variables
const API_URL = "https://api.themoviedb.org/3";
const IMAGES_URL = "https://image.tmdb.org/t/p";
const API_KEY = "ac8ffc0eba4faf52fa1a6b66f2ea86e0";
const ANIMATION_MOVIES_IDS = "16,10751";

//navbar variables
const $navbar = document.querySelector("header nav");
const $searchIcon = document.querySelector(".nav__searchIcon");
const $searxhInput = document.querySelector(".nav__searchBar");

//highlight Variables
const $highlight = document.querySelector(".highlight");
import horlogeIcon from "../assets/icons/horloge.svg";
import playIcon from "../assets/icons/play.png";

//Toggle searchbar
$searchIcon.addEventListener("click", () => {
  $searxhInput.classList.toggle("active");
});

//handle navbar background color on different screen
window.addEventListener("scroll", () => {
  if (window.innerWidth >= 600) {
    if (window.scrollY >= 33) {
      $navbar.style.background = "#121f44";
      $navbar.style.boxShadow = " 3px 1px 5px 1px #040727";
    } else {
      $navbar.style.background = "transparent";
      $navbar.style.boxShadow = "none";
    }
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
  //showMovies(movies, 1);
};

let showHighlight = (movieId) => {
  getMovie(movieId).then((movie) => {
    console.log(movie);
    $highlight.style.background = `rgba(18,31,68,0.7) url( ${IMAGES_URL}/w1280${movie.backdrop_path} )`;
    $highlight.style.backgroundPosition = "center";
    $highlight.style.backgroundSize = "cover";

    let genders = movie.genres.map((genre) => {
      return `<span class="highlight__gender"> ${genre.name}</span>`;
    });

    $highlight.innerHTML = `
    <div class="highlight__content">
        <img src="${IMAGES_URL}/w154${movie.poster_path}" alt="${movie.title}">
        <span class="highlight__releasedYear">
        ${new Date(movie.release_date).getFullYear()}
        </span>
        <h1 class="highlight__title">${movie.original_title}</h1>
        <div class="highlight__genders">
          ${genders}
        </div>
        <P class="highlight__overview">${movie.overview}</P>
        <div class="highlight__additionalInfo">
          <span>
            <img src="${horlogeIcon}" alt="horloge icon"> ${movie.runtime}
          </span>
          <span>TMDB:${movie.vote_average}/10</span>
        </div>
        <buttton class="highlight__btn"> 
          <img src="${playIcon}" alt="play icon">  Bande annonce
        </buttton>
      </div>`;
  });
};

const $movies_container = document.querySelectorAll(".movies__container");
const $studios = document.querySelector(".studios");

const compagnies = [
  {
    compagnyName: "Walt Disney Pictures",
    compagnieId: "2",
    imageUrl: "disney",
  },
  {
    compagnyName: "Pixar",
    compagnieId: "3",
    imageUrl: "pixar",
  },
  {
    compagnyName: "Marvel Entertainment",
    compagnieId: "7505",
    imageUrl: "marvel",
  },
  {
    compagnyName: "DreamWorks Animation",
    compagnieId: "521",
    imageUrl: "dreamorks",
  },
  {
    compagnyName: "Warner Bros. Animation",
    compagnieId: "2785",
    imageUrl: "warnerbros",
  },
];

let showStudios = function () {
  console.log(compagnies);
  compagnies.forEach(function (compagnie) {
    let studio = document.createElement("div");
    studio.setAttribute("class", "studio");
    let studioImg = document.createElement("img");
    studioImg.src = studios[compagnie.imageUrl];
    studioImg.style.width = "100px";
    studio.appendChild(studioImg);
    // studioImg.setAttribute(
    //   "src",
    //   images[compagnie.imageUrl]
    //   //   require(`./assets/logos/${}`)
    // );
    // studio.appendChild(studioImg);
    // studio.innerHTML = `
    // <img src="./assets/logos/${compagnie.imageUrl}" alt="${compagnie.compagnyName}">
    // `;
    $studios.appendChild(studio);
  });
};

function getMoviesReleasedInThisYear(genderId) {
  let year = new Date().getFullYear();
  fetch(
    `${API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genderId}&primary_release_year=${year}`
  )
    .then((response) => response.json())
    .then((response) => showMovies(response, 0));
}

function showMovies(movies, i) {
  let $title = document.createElement("h2");
  $title.textContent = "Animation";

  let $list = document.createElement("div");
  $list.setAttribute("class", "movie__list");

  movies.results.forEach(function (movie) {
    const div = document.createElement("div");
    div.setAttribute("class", "movie");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const span = document.createElement("span");
    img.setAttribute("src", `${IMAGES_URL}${movie.poster_path}`);
    h2.textContent = movie.title;
    h2.setAttribute("class", "movie__name");
    span.textContent = new Date(movie.release_date).getFullYear();
    span.setAttribute("class", "movie__releaseDate");
    div.appendChild(img);
    div.appendChild(h2);
    div.appendChild(span);

    $list.appendChild(div);
  });
  $movies_container[i].appendChild($title);
  $movies_container[i].appendChild($list);
}

//showStudios();
getMovies("movie", ANIMATION_MOVIES_IDS);
//getMoviesReleasedInThisYear(ANIMATION_MOVIES_IDS);
//getMostPopularTVShow(ANIMATION_MOVIES_IDS);
