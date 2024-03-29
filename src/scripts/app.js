//TMDB variables
const API_URL = "https://api.themoviedb.org/3";
const IMAGES_URL = "https://image.tmdb.org/t/p";
const API_KEY = "ac8ffc0eba4faf52fa1a6b66f2ea86e0";
const ANIMATION_MOVIES_IDS = "16,10751";

const body = document.querySelector("body");

//highlight Variables
const $highlight = document.querySelector(".highlight");
import horlogeIcon from "../assets/icons/horloge.svg";
import playIcon from "../assets/icons/play.png";

// movies variables
const $movies_container = document.querySelector(".movies__container");
const $pagination = document.querySelector(".pagination");
import LeftArrow from "../assets/icons/left-arrow.png";
import RightArrow from "../assets/icons/right-arrow.png";
let current_page = 1;

let getMovies = (genderId) => {
  fetch(
    `${API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genderId}&page=${current_page}&language=fr&sort_by=popularity.desc`
  )
    .then((response) => response.json())
    .then((response) => handleMovies(response));
};

let getMovie = async (id) => {
  return await fetch(
    `${API_URL}/movie/${id}?api_key=${API_KEY}&language=fr&append_to_response=videos`
  )
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      return responseData;
    });
};

let handleMovies = (movies) => {
  if (movies.total_results === 0) {
    return;
  }
  showHighlight(movies.results[0].id);
  showMovies(movies);
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

let showHighlight = (movieId) => {
  getMovie(movieId).then((movie) => {
    $highlight.style.background = `rgba(18,31,68,0.7) url( ${IMAGES_URL}/w1280${movie.backdrop_path} )`;
    $highlight.style.backgroundPosition = "center";
    $highlight.style.backgroundSize = "cover";

    let genders = movie.genres.map((genre) => {
      return `<span class="highlight__gender">${genre.name} </span>`;
    });

    let duration = () => {
      if (movie.runtime) {
        let nHours = Math.floor(movie.runtime / 60);
        let nMin = movie.runtime % 60;
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
          ${duration()}
          <span class="highlight__rate">Vote : ${movie.vote_average} / 10</span>
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

function showMovies(movies) {
  $movies_container.innerHTML = "";
  handlePagination(movies.page, movies.total_pages);
  let $list = document.createElement("div");
  $list.setAttribute("class", "movie__list");

  movies.results.forEach(function (movie) {
    const div = document.createElement("div");
    div.setAttribute("class", "movie");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const span = document.createElement("span");
    const vote = document.createElement("span");
    if (movie.poster_path) {
      img.setAttribute("src", `${IMAGES_URL}/w300${movie.poster_path}`);
    } else {
      img.setAttribute(
        "src",
        `https://jonchere.fr/wp-content/themes/myx/assets/images/no-image/No-Image-Found-400x264.png
      `
      );
    }
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
    div.addEventListener("click", () => {
      location.href = `/details.html?categorie=movie&id=${movie.id}`;
    });
    $list.appendChild(div);
  });
  $movies_container.appendChild($list);
}

let handlePagination = (page, total_pages) => {
  current_page = page;
  $pagination.innerHTML = `
  <span class="prevBtn"><img src="${LeftArrow}" alt="prev"></span>
   ${page} / ${total_pages}
  <span class="nextBtn"><img src="${RightArrow}" alt="next"></span>
  `;
  let $prevBtn = document.querySelector(".prevBtn");
  let $nextBtn = document.querySelector(".nextBtn");

  $prevBtn.addEventListener("click", () => {
    if (current_page > 1) {
      current_page -= 1;
      window.scrollTo({ top: 0, behavior: "smooth" });
      getMovies(ANIMATION_MOVIES_IDS);
    }
  });

  $nextBtn.addEventListener("click", () => {
    if (current_page < total_pages) {
      current_page += 1;
      window.scrollTo({ top: 0, behavior: "smooth" });
      getMovies(ANIMATION_MOVIES_IDS);
    }
  });
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

getMovies(ANIMATION_MOVIES_IDS);
