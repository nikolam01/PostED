//------------------------------------------------------------------------------------------------------------------------------
let posts; //napravi promenljivu post

getData(); //ovde pozivamo asinhronu fiju od dole odnosno trazimo podatke od servera

async function getData() {

    const resp = await axios.get("/api/posts"); //uzmi info sa te rute i console loguj je

    posts = resp.data.posts;

    console.log(posts);

    renderPosts(posts); //ovde se renderuje odnosno ubacuje u html

    addEventListeners();


};




const submitBtn = document.querySelector(".submitBtn");

submitBtn.addEventListener('click', async() => {

    console.log("kliknuto");
    const inputAuthor = document.querySelector('.input-author');
    const inputText = document.querySelector('.input-text');

    const author = inputAuthor.value;
    const text = inputText.value;

    if (author === "" || text == "") {
        alert("Popunite post kako treba!");
        return;
    }

    const resp = await axios.post("/api/posts", {
        author,
        text,
    });

    console.log(resp.data);

    location.reload();

});
/*
function incrementValue() {
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('number').value = value;
}
*/
function addEventListeners() { //fija za event kada kliknemo na polje komentar da nam otvori single-post.html

    //querySelectorAll vraca Node Collection
    //to se pretvara u obican niz uz pomoc uglastih zagrada i 3 tacke

    const allPosts = [...document.querySelectorAll(".post")];

    allPosts.forEach(post => {

        post.addEventListener('click', () => {
            const postId = post.getAttribute("post-id"); //izvlacimo broj id-a iz posta
            console.log(postId);

            location.href = `/single_post/single_post.html?postId=${postId}`; //ispod je objasnjenje za ovu liniju koda koja je BITNAAA!!!!!

            /*pucamo na lokaciju gde je htmli preko url odredjujemo koji post ce nam prikazati,
            sa njegovim komentarima, odnosno da u URL-u pise na koji post smo kliknuli pa smo dotle dosli*/
        });
    });
}



function renderPosts(posts) {
    const postsContainer = document.querySelector(".posts");
    let div;

    posts.forEach((post) => {
        div = createPostDiv(post);
        postsContainer.appendChild(div);
    });
}

function createPostDiv(post) {
    const { _id, author, text, createdAt, commentsNumber } = post;

    const div = document.createElement("div");
    div.className = "post";
    div.setAttribute("post-id", _id);


    //--------------DIV koji se stvara sa podacima iz inputa------------------//
    div.innerHTML = `
    <div class="post-header">
    <div class="author">${author}</div>
    <div class="post-time">${createdAt}</div>
</div>
<div class="text">${text}
</div>
<div class="post-footer">
    <div class="commentsNumber">Comments:  ${commentsNumber}</div>
    
</div>
  `;

    return div;
}

//----------------------Dugme Publish Post i fije da kada ga kliknemo pokaze input polja------------------------------------
const inputBtn = document.querySelector("#objavi-btn");
const inputBlock = document.querySelector(".input-block");
var timesClicked = 0;


inputBtn.addEventListener('click', () => {
    timesClicked++;

    if (timesClicked % 2 == 0) {
        function evenClick() {
            inputBlock.style.display = 'none';
        }
        evenClick();

    } else {
        function oddClick() {
            inputBlock.style.display = 'contents';
        }
        oddClick();

    }
});