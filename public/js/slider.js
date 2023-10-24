document.addEventListener("click", (e) => {
  let handle2;
  if (e.target.matches(".handle2")) {
    handle2 = e.target;
  } else {
    handle2 = e.target.closest(".handle2");
  }
  if (handle2 != null) onhandle2Click(handle2);
});

const throttleProgress2 = throttle(() => {
  document.querySelectorAll(".nav-bar").forEach(calculateProgressBar2);
}, 250);
window.addEventListener("resize", throttleProgress2);

document.querySelectorAll(".nav-bar").forEach(calculateProgressBar2);

function calculateProgressBar2(progressBar) {
  progressBar.innerHTML = "";
  const slider2 = progressBar
    .closest(".service__row")
    .querySelector(".slider2");
  const itemCount2 = slider2.children.length;
  const itemsPerScreen2 = parseInt(
    getComputedStyle(slider2).getPropertyValue("--items-per-screen2")
  );
  let sliderIndex2 = parseInt(
    getComputedStyle(slider2).getPropertyValue("--slider-index2")
  );
  const progressBarItemCount2 = Math.ceil(itemCount2 / itemsPerScreen2);

  if (sliderIndex2 >= progressBarItemCount2) {
    slider2.style.setProperty("--slider-index2", progressBarItemCount2 - 1);
    sliderIndex2 = progressBarItemCount2 - 1;
  }

  for (let i = 0; i < progressBarItemCount2; i++) {
    const barItem2 = document.createElement("div");
    barItem2.classList.add("nav-item");
    if (i === sliderIndex2) {
      barItem2.classList.add("active");
    }
    progressBar.append(barItem2);
  }
}

function onhandle2Click(handle2) {
  const progressBar2 = handle2
    .closest(".service__row")
    .querySelector(".nav-bar");
  const slider = handle2
    .closest(".container-service")
    .querySelector(".slider2");
  const sliderIndex2 = parseInt(
    getComputedStyle(slider).getPropertyValue("--slider-index2")
  );
  const progressBarItemCount2 = progressBar2.children.length;
  if (handle2.classList.contains("left-handle2")) {
    if (sliderIndex2 - 1 < 0) {
      slider.style.setProperty("--slider-index2", progressBarItemCount2 - 1);
      progressBar2.children[sliderIndex2].classList.remove("active");
      progressBar2.children[progressBarItemCount2 - 1].classList.add("active");
    } else {
      slider.style.setProperty("--slider-index2", sliderIndex2 - 1);
      progressBar2.children[sliderIndex2].classList.remove("active");
      progressBar2.children[sliderIndex2 - 1].classList.add("active");
    }
  }

  if (handle2.classList.contains("right-handle2")) {
    if (sliderIndex2 + 1 >= progressBarItemCount2) {
      slider.style.setProperty("--slider-index2", 0);
      progressBar2.children[sliderIndex2].classList.remove("active");
      progressBar2.children[0].classList.add("active");
    } else {
      slider.style.setProperty("--slider-index2", sliderIndex2 + 1);
      progressBar2.children[sliderIndex2].classList.remove("active");
      progressBar2.children[sliderIndex2 + 1].classList.add("active");
    }
  }
}

function throttle(cb, delay = 1000) {
  let shouldWait = false;
  let waitingArgs;
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false;
    } else {
      cb(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    cb(...args);
    shouldWait = true;
    setTimeout(timeoutFunc, delay);
  };
}
