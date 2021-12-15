import { getUsername } from "../settings/api.js";

export function createNav() {
  const username = getUsername();
  let authLink = `<a href="login.html"><i class="fas fa-user-circle"></i></a>`;

  if (username) {
    authLink = ` <a href="admin.html" style="color:rgb(97, 209, 114);"><i class="fas fa-user-circle"></i></a>`;
  }

  const container = document.querySelector(".account-link");

  container.innerHTML = `${authLink}`;
}
