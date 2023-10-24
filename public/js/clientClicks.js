console.log("Client-side code running");

const button = document.getElementById("myButton");
button.addEventListener("click", async function (e) {
  fetch("/clicked", { method: "POST" })
    .then(function (response) {
      if (response.ok) {
        console.log("Click was recorded");
        return;
      }
      throw new Error("Request failed.");
    })
    .catch(function (error) {
      console.log(error);
    });
});
setInterval(function () {
  fetch("/clicked", { method: "GET" })
    .then(function (response) {
      if (response.ok) return response.json();
      throw new Error("Request failed.");
    })
    .then(function (data) {
      document.getElementById(
        "counter"
      ).innerHTML = `Facebook shares ${data.length}`;
    })
    .catch(function (error) {
      console.log(error);
    });
}, 10000);

const button2 = document.getElementById("myButton2");
button2.addEventListener("click", async function (e) {
  //console.log("button was clicked");

  fetch("/shared", { method: "POST" })
    .then(function (response) {
      if (response.ok) {
        console.log("Click was recorded");
        return;
      }
      throw new Error("Request failed.");
    })
    .catch(function (error) {
      console.log(error);
    });
});

setInterval(function () {
  fetch("/shared", { method: "GET" })
    .then(function (response) {
      if (response.ok) return response.json();
      throw new Error("Request failed.");
    })
    .then(function (data) {
      document.getElementById("counter2").innerHTML = `Share shares ${(math =
        -data.length)}`;
    })
    .catch(function (error) {
      console.log(error);
    });
}, 10000);

