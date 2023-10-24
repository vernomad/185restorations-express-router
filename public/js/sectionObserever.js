// For heading sectionOne
const header = document.querySelector(".head");
const sectionOne = document.querySelector(".scroll-element");

const sectionOneOptions = {
  rootMargin: "-150px 0px 3000px 0px",
};

const sectionOneObserver = new IntersectionObserver(function (
  entries,
  sectionOneObserver
) {
  entries.forEach((entry) => {
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

// For All sections
// const sections = document.querySelectorAll("section");

//Section Two Settings
// const sectionsOptions = {
//   rootMargin: "0px 0px 0px 0px",
// };
// const observer = new IntersectionObserver(function (entries, observer) {
//   entries.forEach((entry) => {
//     if (!entry.isIntersecting) {
//       console.log(entry.target);
//       // observer.unobserve(entry.target);
//     }
//   });
// }, sectionsOptions);
// sections.forEach((section) => {
//   observer.observe(section);
// });
