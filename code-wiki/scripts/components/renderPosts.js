export function renderPosts(postsToRender) {
  const postsContainer = document.querySelector(".postsContainer");
  postsContainer.innerHTML = "";

  postsToRender.forEach(function (post) {
    postsContainer.innerHTML += `<div class="post">
          <div class="post-info">
            <h2>${post.title.rendered}</h2>
            <div class="post-content">
              ${post.content.rendered}
            </div>
          </div>
        </div>`;
  });
}
