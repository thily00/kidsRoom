//navbar variables
const $navbar = document.querySelector("header nav");
const $searchIcon = document.querySelector(".nav__searchIcon");
const $searchInput = document.querySelector(".nav__searchBar");
const $searchValue = document.querySelector(".searchBar__input");
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

showStudios();
