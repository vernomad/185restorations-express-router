const shareData = {
  title: "185 Restorations",
  text: "Christchurch professional classic & custom restorers",
  url: "https://185restorations.co.nz",
};

const btn = document.querySelector(".myown");
const resultPara = document.querySelector(".result");

// Share must be triggered by "user activation"
btn.addEventListener("click", async () => {
  try {
    await navigator.share(shareData);
    setTimeout(function () {
      resultPara.textContent = "Thanks 185 shared successfully!";
    }, 5000);
  } catch (err) {
    resultPara.textContent = "Error: " + err;
  }
});
