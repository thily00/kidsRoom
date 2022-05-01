const API_URL = "https://api.themoviedb.org/3";
const IMAGES_URL = "https://image.tmdb.org/t/p/w154";
const API_KEY = "ac8ffc0eba4faf52fa1a6b66f2ea86e0";
//const FAMILY_MOVIES_ID = "10751";
const FAMILY_MOVIES_ID = "16";

const $most_popular = document.querySelector(".most__popular");
const $highlight = document.querySelector(".highlight");

function getMoviesByGender(genderId) {
  fetch(
    `${API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genderId}&sort_by=popularity.desc`
  )
    .then((response) => response.json())
    .then((response) => showMovies(response));
}

function showMovies(movies) {
  console.log(movies);
  if (movies.total_results === 0) {
    //$count.innerText = "Aucun résultat, désolé !";
    return;
  }

  const highlight = movies.results[0];
  $highlight.style.backgroundImage = `
  linear-gradient(to bottom, #f5f6fc00, #000321),url(
    https://image.tmdb.org/t/p/w1280${highlight.backdrop_path}
  )`;

  $highlight.innerHTML = `
  <div class="highlight__content">
        <h1>${highlight.original_title}</h1>;
        <div>
            <span>TMDB: ${highlight.vote_average}</span>
            <span>${highlight.release_date}</span>
        </div>
        <P>${highlight.overview}</P>
        <buttton>Plus d'info</buttton>
        <buttton>Ajouter au favoris</buttton>
  </div>`;

  //$highlight.appendChild($highlight_content);

  let $title = document.createElement("h2");
  $title.textContent = "Populaires";

  let $list = document.createElement("div");
  $list.setAttribute("class", "movie__list");

  movies.results.forEach(function (movie) {
    const div = document.createElement("div");
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
  $most_popular.appendChild($title);
  $most_popular.appendChild($list);
}

getMoviesByGender(FAMILY_MOVIES_ID);
