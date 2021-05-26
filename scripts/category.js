

const postContainer = document.querySelector(".blog-container");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://nomadlife.tinadahl.no/wp-json/wp/v2/posts/?categories=" + id + "&_embed";

async function getPosts() {

    try {
        const response = await fetch(url);
        const results = await response.json();
        displayPosts(results);
    }
    catch (error) {
        console.log(error);
    }
}

getPosts()


// display posts
const blogContainer = document.querySelector(".blog-container");

function displayPosts(post) {
    console.log(post);

    for (let i = 0; i < post.length; i++) {

        const newDate = new Date(post[i].date).toLocaleString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        blogContainer.innerHTML += `<a href="post.html?id=${post[i].id}">
                                        <div class="blog-page-box">
                                            <div class="img-wrapper">
                                                <img src="${post[i]._embedded['wp:featuredmedia']['0'].source_url}" class="box-image box-image-one">
                                            </div>
                                            <div class="box-text box-text-one">
                                                <h3 class="carousel-text post-h3">${post[i].title.rendered}</h3>
                                                <p class="date">${newDate}</p>
                                                <p class="excerpt">${post[i].excerpt.rendered}</p>
                                            </div>
                                        </div>
                                    </a>`

    }
}

// display category name in title and h1

const pageTitle = document.querySelector("title");
const pageHeader = document.querySelector(".h1-categories");
const breadcrumbs = document.querySelector(".breadcrumbs");
const categoriesUrl = "https://nomadlife.tinadahl.no/wp-json/wp/v2/categories/" + id + "?per_page=100";

async function displayCategory() {

    try {
        const response = await fetch(categoriesUrl);
        const categories = await response.json();
        console.log(categories);
            pageHeader.innerHTML += `${categories.name}`;
            pageTitle.innerHTML = `${categories.name} | Categories | Nomadlife`;
            breadcrumbs.innerHTML = `<a href="blog.html">Blog</a> > <strong>${categories.name}</strong>`
    }
    catch (error) {
        console.log(error);
    }
}

displayCategory()
