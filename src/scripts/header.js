//navbar variables
const $navbar = document.querySelector("header nav");
const $searchIcon = document.querySelector(".nav__searchIcon");
const $searxhInput = document.querySelector(".nav__searchBar");
const $studiosDropdown = document.querySelector(".studios .dropdown-content");
const compagnies = require("../assets/compagnie.json");

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

let showStudios = function () {
  console.log(compagnies);
  compagnies.data.forEach(function (compagnie) {
    let studio = document.createElement("a");
    studio.setAttribute("href", `/compagny/${compagnie.compagnieId}`);
    studio.textContent = compagnie.compagnyName;
    $studiosDropdown.appendChild(studio);
  });
  console.log($studiosDropdown);
};

showStudios();
