const API_URL = "https://api.themoviedb.org/3";
const IMAGES_URL = "https://image.tmdb.org/t/p";
const API_KEY = "ac8ffc0eba4faf52fa1a6b66f2ea86e0";
const ANIMATION_MOVIES_IDS = "16,10751";

//navbar variables
const $navbar = document.querySelector("header nav");
const $searchIcon = document.querySelector(".nav__searchIcon");
const $searchInput = document.querySelector(".nav__searchBar");
const $searchValue = document.querySelector(".searchBar__input");
let searchBox = document.querySelector(".search__box");
const $studiosDropdown = document.querySelector(".studios .dropdown-content");
const $menuIcon = document.querySelector(".menuIcon");
const $closeIcon = document.querySelector(".close_btn");
const $menu = document.querySelector(".nav__menu");
const compagnies = require("../assets/compagnie.json");

//open menu
$menuIcon.addEventListener("click", () => {
  $menu.classList.add("mobile__menu");
});

//close menu
$closeIcon.addEventListener("click", () => {
  $menu.classList.remove("mobile__menu");
});

//Toggle searchbar
$searchIcon.addEventListener("click", () => {
  $searchInput.classList.toggle("active");
});

//handle navbar background color on different screen
window.addEventListener("scroll", () => {
  if (window.scrollY >= 33) {
    $navbar.classList.add("nav__background");
  } else {
    $navbar.classList.remove("nav__background");
  }
});

//show studios
let showStudios = function () {
  compagnies.data.forEach(function (compagnie) {
    let studio = document.createElement("a");
    studio.setAttribute(
      "href",
      `/company.html?company-id=${compagnie.compagnieId}`
    );
    studio.textContent = compagnie.compagnyName;
    $studiosDropdown.appendChild(studio);
  });
};

$searchValue.addEventListener("keyup", function () {
  if ($searchValue.value.trim() != "") {
    search($searchValue.value);
  } else {
    searchBox.classList.remove("active");
  }
});

let search = (query) => {
  fetch(`${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`)
    .then((response) => response.json())
    .then((response) => handleSearch(response));
};

let handleSearch = (response) => {
  searchBox.innerHTML = "";
  searchBox.classList.add("active");
  response.results.forEach(function (movie) {
    let searchBoxItem = document.createElement("spaan");
    searchBoxItem.setAttribute("class", "search__boxItem");
    const img = document.createElement("img");
    img.setAttribute("class", "search__boxItemImage");
    const h2 = document.createElement("h2");
    h2.setAttribute("class", "search__boxItemName");
    h2.textContent = movie.original_title || movie.original_name;

    if (movie.poster_path != null) {
      img.setAttribute("src", `${IMAGES_URL}/w154${movie.poster_path}`);
    } else {
      img.setAttribute(
        "src",
        `https://jonchere.fr/wp-content/themes/myx/assets/images/no-image/No-Image-Found-400x264.png`
      );
    }
    searchBoxItem.appendChild(img);
    searchBoxItem.appendChild(h2);

    searchBoxItem.addEventListener("click", () => {
      location.href = `/details.html?categorie=movie&id=${movie.id}`;
    });
    searchBox.appendChild(searchBoxItem);
  });
  $searchInput.appendChild(searchBox);
};

showStudios();
