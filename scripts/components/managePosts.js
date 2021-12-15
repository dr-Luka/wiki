import { baseUrl } from "../settings/api.js";
import { getToken } from "../settings/api.js";

// RENDER PRODUCTS FOR MANAGING
export function managePosts(postsToRender) {
  const postsContainer = document.querySelector(".admin-posts");
  postsContainer.innerHTML = "";

  postsToRender.forEach(function (post) {
    postsContainer.innerHTML += `<div class="panel-post"><div class="panel-post-title"><h2>${post.title.rendered}</h2></div><div class="manageButtonsContainer"><button data-id="${post.id}" class="deleteButton manageButton" >Delete</button>
    <a href="update.html?id=${post.id}"><button class="editButton manageButton" data-id="${post.id}">Update</button></a>
    </div></div>`;
  });

  const deleteButton = document.querySelectorAll(".deleteButton");

  deleteButton.forEach(function (button) {
    button.addEventListener("click", deletePost);
  });
}

// DELETE PRODUCTS

export async function deletePost() {
  const doDelete = confirm("Are you sure you want to delete this post?");
  if (doDelete) {
    const id = event.target.dataset.id;
    const url = baseUrl + "/wp-json/wp/v2/posts/" + id;
    const token = getToken();

    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const deleteResponse = await fetch(url, options);
      const json = await deleteResponse.json();
      location.href = "admin.html";
    } catch (error) {
      console.log(error);
    }
  }
}
