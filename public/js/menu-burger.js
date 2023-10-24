const menuBtn = document.querySelector(".menu");
const menu = document.querySelector(".project_nav");
const overlay = document.getElementById("overlay");
let menuOpen = false;

menuBtn.addEventListener("click", () => {
  if (!menuOpen) {
    overlay.classList.toggle("active");
    menuBtn.classList.toggle("active");
    menu.classList.add("active");
    menuOpen = true;
  } else {
    overlay.classList.remove("active");
    menuBtn.classList.remove("active");
    menu.classList.remove("active");
    menuOpen = false;
  }
});
menuBtn.addEventListener("click", () => {
  const isOpened = menuBtn.getAttribute("aria-expanded", "false");
  if (isOpened === "true") {
    menuBtn.setAttribute("aria-expanded", "false");
  } else {
    menuBtn.setAttribute("aria-expanded", "true");
  }
});

overlay.addEventListener("click", () => {
  overlay.classList.remove("active");
  menuBtn.classList.remove("active");
  menu.classList.remove("active");
  menuBtn.setAttribute("aria-expanded", "false");
  menuOpen = false;
});
