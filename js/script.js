import "./core/events.js";



window.addEventListener("load", function () {
  let preloader = document.getElementById("loader");
  if (preloader) {
    preloader.classList.add("hidden");
  }
});
