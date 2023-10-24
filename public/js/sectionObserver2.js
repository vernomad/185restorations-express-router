// For heading sectionOne
const header = document.querySelector(".head");
const sectionOne = document.querySelector(".scroll-element");

const sectionOneOptions = {
  root: null,
  threshold: 1,
  rootMargin: "-25px 0px 3000px 0px",
};

const sectionOneObserver = new IntersectionObserver(function (
  entries,
  sectionOneObserver
) {
  entries.forEach((entry) => {
    console.log(entry.target);
    if (!entry.isIntersecting) {
      header.classList.remove("nav-scrolled-up");
      header.classList.add("nav-scrolled");
    } else {
      header.classList.remove("nav-scrolled");
      header.classList.add("nav-scrolled-up");
    }
  });
},
sectionOneOptions);

sectionOneObserver.observe(sectionOne);
