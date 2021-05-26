
const pageTitle = document.querySelector("title");
const postContainer = document.querySelector(".blog-container");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://nomadlife.tinadahl.no/wp-json/wp/v2/posts/" + id + "?_embed";

async function getPost() {

    try {
        const response = await fetch(url);
        const result = await response.json()
        console.log(result);

        const newDate = new Date(result.date).toLocaleString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        postContainer.innerHTML += `<div class="intro">
                                        <h1>${result.title.rendered}</h1>
                                        <p class="date">${newDate}</p>
                                        <img src="${result._embedded['wp:featuredmedia']['0'].source_url}" class="featured-image" alt="${result._embedded['wp:featuredmedia']['0'].alt_text}">
                                    </div>
                                    <div class="post-container">
                                        <div class="post-content">
                                            ${result.content.rendered}
                                        </div>
                                    </div>`

        pageTitle.innerHTML += `${result.title.rendered}`

    }

    catch (error) {
        console.log(error);
    }
}

getPost()



let imageClicked = null;
const apiImg = document.querySelector("#api-img");
const closeBtn = document.querySelector(".closeBtn");
const modal = document.querySelector(".modal-container");
const modalContent = document.querySelector(".modal-content");

postContainer.addEventListener("click", function (e) {
    if (e.target && e.target.nodeName == "IMG") {
        console.log("An image was clicked!");
        modal.style.display = "flex";
        closeBtn.style.display = "flex";
        apiImg.src = e.target.currentSrc;
        imageClicked = e.target;

    }

    modal.onclick = function (e) {
        modal.style.display = "none";
        closeBtn.style.display = "none"
    }

});




