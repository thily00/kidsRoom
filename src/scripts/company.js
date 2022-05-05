const API_URL = "https://api.themoviedb.org/3";
const IMAGES_URL = "https://image.tmdb.org/t/p";
const API_KEY = "ac8ffc0eba4faf52fa1a6b66f2ea86e0";

const $company = document.querySelector(".company");
const $movies_container = document.querySelector(".movies__container");

let id = parseInt(
  new URLSearchParams(window.location.search).get("company-id")
);

let getCompany = () => {
  fetch(`${API_URL}/company/${id}?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((response) => handleCompany(response));
};

let getMovies = (categorie) => {
  fetch(
    `${API_URL}/discover/movie?api_key=${API_KEY}&with_companies=${id}&language=fr&sort_by=popularity.desc`
  )
    .then((response) => response.json())
    .then((response) => showMovies(response));
};

let handleCompany = (response) => {
  let logo = document.createElement("img");
  let name = document.createElement("span");
  $company.innerHTML = `
    <img class="company__logo" src="${IMAGES_URL}/w500${response.logo_path}" alt="logo">  
    <span class="company__name">${response.name}</span>
    <a href="${response.homepage}" target="_blank" class="company__url">Site web</a>
  `;
  console.log(response);
};

function showMovies(movies) {
  $movies_container.innerHTML = "";
  // handlePagination(movies.page, movies.total_pages);
  let $list = document.createElement("div");
  $list.setAttribute("class", "movie__list");

  movies.results.forEach(function (movie) {
    const div = document.createElement("div");
    div.setAttribute("class", "movie");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const span = document.createElement("span");
    const vote = document.createElement("span");
    img.setAttribute("src", `${IMAGES_URL}/w300${movie.poster_path}`);
    h2.textContent = movie.original_title || movie.original_name;
    h2.setAttribute("class", "movie__name");
    span.textContent = getYears(movie);
    span.setAttribute("class", "movie__releaseDate");
    vote.textContent = movie.vote_average;
    vote.setAttribute("class", "movie_voteAverage");
    div.appendChild(img);
    div.appendChild(h2);
    div.appendChild(span);
    div.appendChild(vote);
    $list.appendChild(div);
  });
  $movies_container.appendChild($list);
}

let getYears = (movie) => {
  let date;
  if (movie.release_date) {
    date = new Date(movie.release_date).getFullYear();
  } else {
    date = new Date(movie.first_air_date).getFullYear();
  }
  return date;
};

getCompany();
getMovies();
