// START LightModeJS

let lightMode = localStorage.getItem("lightMode");
const lightModeToggle = document.querySelector("#theme");

const enableLightMode = () => {
  document.body.classList.add("lightmode");

  localStorage.setItem("lightMode", "enabled");
};

const disabelLightMode = () => {
  document.body.classList.remove("lightmode");

  localStorage.setItem("lightMode", "null");
};

if (lightMode === "enabled") {
  enableLightMode();
}

lightModeToggle.addEventListener("click", () => {
  lightMode = localStorage.getItem("lightMode");
  if (lightMode !== "enabled") {
    enableLightMode();
    lightModeToggle.classList.toggle("active");
  } else {
    disabelLightMode();
    lightModeToggle.classList.remove("active");
  }
});
