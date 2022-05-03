const $navbar = document.querySelector("header nav");
const $searchIcon = document.querySelector(".nav__searchIcon");
const $searxhInput = document.querySelector(".nav__searchBar");

//Toggle searchbar
$searchIcon.addEventListener("click", () => {
  $searxhInput.classList.toggle("active");
});

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

import * as studios from "../assets/logos/*.png";

const API_URL = "https://api.themoviedb.org/3";
const IMAGES_URL = "https://image.tmdb.org/t/p/w154";
const API_KEY = "ac8ffc0eba4faf52fa1a6b66f2ea86e0";
const ANIMATION_MOVIES_IDS = "16,10751";

const $movies_container = document.querySelectorAll(".movies__container");
const $highlight = document.querySelector(".highlight");
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

function getMostPopularMovies(genderId) {
  fetch(
    `${API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genderId}&sort_by=popularity.desc`
  )
    .then((response) => response.json())
    .then((response) => handleMovies(response));
}

function getMostPopularTVShow(genderId) {
  fetch(
    `${API_URL}/discover/tv?api_key=${API_KEY}&with_genres=${genderId}&sort_by=popularity.desc`
  )
    .then((response) => response.json())
    .then((response) => showMovies(response, 2));
}

let handleMovies = (movies) => {
  console.log(movies);
  if (movies.total_results === 0) {
    //$count.innerText = "Aucun résultat, désolé !";
    return;
  }
  showHighlight(movies.results[0]);
  showMovies(movies, 1);
};

let showHighlight = function (movie) {
  // $highlight.style.backgroundImage = `
  //   linear-gradient(to bottom, #f5f6fc00, #000321),url(
  //       https://image.tmdb.org/t/p/w1280${movie.backdrop_path}
  //   )`;

  $highlight.style.background = `rgba(18,31,68,0.7) url( https://image.tmdb.org/t/p/w1280${movie.backdrop_path} )`;
  $highlight.innerHTML = `
    <div class="highlight__content">
            <h1>${movie.original_title}</h1>;
            <div>
                <span>TMDB: ${movie.vote_average}</span>
                <span>${movie.release_date}</span>
            </div>
            <P>${movie.overview}</P>
            <buttton>Plus d'info</buttton>
            <buttton>Ajouter au favoris</buttton>
    </div>`;
};

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

showStudios();
getMostPopularMovies(ANIMATION_MOVIES_IDS);
getMoviesReleasedInThisYear(ANIMATION_MOVIES_IDS);
getMostPopularTVShow(ANIMATION_MOVIES_IDS);
