const postId = new URLSearchParams(window.location.search).get("postId");

console.log(postId);

let post;

getData();

async function getData() {
  const resp = await axios.get(`/api/posts/${postId}`);

  post = resp.data.post;

  console.log(post);

  renderPost(post);

  renderComments(post);
}

const btnSendComment = document.querySelector(".submitBtn");

btnSendComment.addEventListener("click", async () => {
  console.log("Dugme je kliknuto");

  const inputAuthor = document.querySelector(".input-author");
  const inputText = document.querySelector(".input-text");

  const author = inputAuthor.value;
  const text = inputText.value;

  if (author == "" || text == "") {
    alert("Popunite komentar kako treba!");
    return;
  }

  const resp = await axios.post("/api/comment", {
    postId: postId,
    author: author,
    text: text,
  });

  console.log(resp.data);

  location.reload(); //automatski da osvezi stranu da bi nam se posle dugmeta postavi odmah pojavio komentar
});

function renderPost(post) {
  const { _id, author, createdAt, text, commentsNumber } = post;

  const html = `
    <div class="post-id">#${_id}</div>
    <div class="post-header">
    <div class="author">${author}</div>
    <div class="post-time">${createdAt}</div>
</div>
<div class="text">${text}
</div>
      `;

  const postDiv = document.querySelector(".post");

  postDiv.innerHTML = html;
}

function renderComments(post) {
  const comments = post.comments;
  const commentsContainer = document.querySelector(".comments");
  let div;

  comments.forEach((comment) => {
    div = createCommentDiv(comment);
    commentsContainer.appendChild(div);
  });
}

function createCommentDiv(comment) {
  const { author, text, createdAt } = comment;

  const div = document.createElement("div");
  div.className = "comment";

  div.innerHTML = `
    <div class="comment-header">
    <div class="comment-author">${author}</div>
    <div class="comment-time">${createdAt}</div>
</div>
<div class="comment-text">${text}
</div>
    `;

  return div;
}

const inputBtn = document.querySelector("#objavi-btn");
const inputBlock = document.querySelector(".input-block");
var timesClicked = 0;

inputBtn.addEventListener("click", () => {
  timesClicked++;

  if (timesClicked % 2 == 0) {
    function evenClick() {
      inputBlock.style.display = "none";
    }
    evenClick();
  } else {
    function oddClick() {
      inputBlock.style.display = "contents";
    }
    oddClick();
  }
});
