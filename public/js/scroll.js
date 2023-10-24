gsap.registerPlugin(ScrollTrigger);

// let duration = 20,
//   sections = gsap.utils.toArray(""),
//   sectionIncrement = duration / (sections.length - 1),
//   t6 = gsap.timeline({
//     scrollTrigger: {
//       trigger: "body",
//       start: "side",
//       end: "+=455px",
//       markers: true,
//       scrub: 1,
//       snap: 1 / 1,
//       onUpdate: (self) => {
//         connectTitle.style.setProperty("--progress", self.progress * 100);
//         connectTitle.style.setProperty(
//           "--velocity",
//           Math.abs(self.getVelocity() / 3500)
//         );
//       },
//       onScrubComplete: () => {
//         connectTitle.style.setProperty("--velocity", 0);
//       },
//       onEnter: () => {
//         connectTitle.style.setProperty("--velocity", 0);
//       },
//       onEnterBack: () => {
//         connectTitle.style.setProperty("--velocity", 0);
//       },
//     },
//   });
// t6.fromTo(
//   sections,
//   {
//     yPercent: -300 * (sections.length - 1),
//     duration: duration,
//     ease: "none",
//     // scale: 0.1,
//     y: -260,
//   },
//   {
//     yPercent: -100 * (sections.length - 1),
//     duration: duration,
//     ease: "none",
//     // scale: 1,
//     y: 475,
//   }
// );

let t71 = gsap.timeline({
  scrollTrigger: {
    trigger: ".container__connect",
    start: "0px",
    end: "250px",
    scrub: 1,
    //markers: true,
  },
});
t71.fromTo(
  ".connectTitle",
  { perspective: 1000, rotateX: 0 },
  { perspective: 1000, rotateX: 87 }
);
let t1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".container__connect",
    start: "250px",
    end: "450px",
    scrub: 1,
    // markers: true,
  },
});
t1.fromTo(".connect__description", { opacity: 0 }, { opacity: 1 });
