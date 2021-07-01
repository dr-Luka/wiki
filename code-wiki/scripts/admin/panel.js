import { createNav } from "../components/nav.js";
createNav();
import { clearStorage } from "../settings/api.js";

const button = document.querySelector(".logout-button");

if (button) {
  button.onclick = function () {
    const doLogout = confirm(
      "Are you sure you want to end the session and log out?"
    );

    if (doLogout) {
      clearStorage("user");
      clearStorage("token");

      location.href = "index.html";
    }
  };
}
