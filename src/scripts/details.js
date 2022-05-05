const API_URL = "https://api.themoviedb.org/3";
const IMAGES_URL = "https://image.tmdb.org/t/p";
const API_KEY = "ac8ffc0eba4faf52fa1a6b66f2ea86e0";

const body = document.querySelector("body");
const $highlight = document.querySelector(".highlight");
import horlogeIcon from "../assets/icons/horloge.svg";
import playIcon from "../assets/icons/play.png";

let id = parseInt(new URLSearchParams(window.location.search).get("id"));
let categorie = new URLSearchParams(window.location.search).get("categorie");

let getMovie = async () => {
  return await fetch(
    `${API_URL}/${categorie}/${id}?api_key=${API_KEY}&language=fr&append_to_response=videos`
  )
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      return responseData;
    });
};

let showHighlight = () => {
  getMovie(categorie, id).then((movie) => {
    $highlight.style.background = `rgba(18,31,68,0.7) url( ${IMAGES_URL}/w1280${movie.backdrop_path} )`;
    $highlight.style.backgroundPosition = "center";
    $highlight.style.backgroundSize = "cover";

    let genders = movie.genres.map((genre) => {
      return `<span class="highlight__gender">${genre.name} </span>`;
    });

    let duration = (runtime) => {
      if (runtime) {
        let nHours = Math.floor(runtime / 60);
        let nMin = runtime % 60;
        return `
            <span class="highlight__duration">
            <img src="${horlogeIcon}" alt="horloge icon"> 
            ${nHours}h : ${nMin} mn
          </span>
          `;
      } else {
        return "";
      }
    };

    $highlight.style.height = "100vh";
    $highlight.innerHTML = `
      <div class="highlight__content">
          <img class="highlight__contentPoster" src="${IMAGES_URL}/w500${
      movie.poster_path
    }" alt="${movie.title}">
          <div class="highlight__info">
          <span class="highlight__releasedYear">
          ${getYears(movie)}
          </span>
          <h1 class="highlight__title">${
            movie.original_title || movie.original_name
          }</h1>
          <div class="highlight__genders">
            ${genders}
          </div>
          <P class="highlight__overview">${movie.overview}</P>
          <div class="highlight__additionalInfo">
            ${duration(movie.runtime)}
            <span class="highlight__rate">Vote : ${
              movie.vote_average
            } / 10</span>
          </div>
          <buttton class="highlight__btn"> 
            <img src="${playIcon}" alt="play icon">  Bande annonce
          </buttton>
          </div>
        </div>`;
    const $highlight__btn = document.querySelector(".highlight__btn");
    $highlight__btn.addEventListener("click", () => {
      if (movie.videos.results.length > 0) {
        showtrailer(movie.videos.results[0].key);
      } else {
        alert("la bande d'annonce n'est pas encore disponible !");
      }
    });
  });
};

let getYears = (movie) => {
  let date;
  if (movie.release_date) {
    date = new Date(movie.release_date).getFullYear();
  } else {
    date = new Date(movie.first_air_date).getFullYear();
  }
  return date;
};

let showtrailer = (id) => {
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

showHighlight();
