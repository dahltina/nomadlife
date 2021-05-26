
const url = "https://nomadlife.tinadahl.no/wp-json/wp/v2/posts/?per_page=10&page=1&_embed";
const loadMoreBtn = document.querySelector(".load-more");

async function getLatestPosts() {

    try {
        const response = await fetch(url);
        const results = await response.json();
        displayPosts(results);
    }
    catch (error) {
        console.log(error);
    }
}

getLatestPosts()


// display all posts blog page
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
                                                <img src="${post[i]._embedded['wp:featuredmedia']['0'].source_url}" class="box-image box-image-one" alt="${post[i]._embedded['wp:featuredmedia']['0'].alt_text}">
                                            </div>
                                            <div class="box-text box-text-one">
                                                <h3 class="carousel-text post-h3">${post[i].title.rendered}</h3>
                                                <p class="date">${newDate}</p>
                                                <p class="excerpt">${post[i].excerpt.rendered}</p>
                                                <div class="thin line blog-page-line"></div>
                                            </div>
                                        </div>
                                    </a>`
    }
}

// load more posts

let page = 2;
const url2 = "https://nomadlife.tinadahl.no/wp-json/wp/v2/posts/?per_page=10&page=" + page + "&_embed";

async function getMorePosts() {

    try {
        const response = await fetch(url2);
        const results = await response.json();
        displayPosts(results);
    }
    catch (error) {
        console.log(error);
    }
}

const loadMore = async () => {
    page++
    await getMorePosts()
    loadMoreBtn.style.display = "none";
}

loadMoreBtn.addEventListener("click", loadMore)




// get featured post
const featuredPostUrl = "https://nomadlife.tinadahl.no/wp-json/wp/v2/posts/50/?_embed";

async function getFeaturedPost() {

    try {
        const response = await fetch(featuredPostUrl);
        const results = await response.json();
        displayFeaturedPost(results);
    }
    catch (error) {
        console.log(error);
    }
}

getFeaturedPost()

const featuredContainer = document.querySelector(".featured-post-container")

function displayFeaturedPost(post) {
    console.log(post);

    featuredContainer.innerHTML += `<a href="post.html?id=50">
                                        <img src="${post._embedded['wp:featuredmedia']['0'].source_url}" class="carousel-image" alt="${post._embedded['wp:featuredmedia']['0'].alt_text}">
                                        <div class="overlay">
                                            <h3 class="carousel-text">${post.title.rendered}</h3>
                                            <p>${post.excerpt.rendered}</p>
                                        </div>
                                    </div>
                                </a>`
}


// get categories
const categoriesUrl = "https://nomadlife.tinadahl.no/wp-json/wp/v2/categories/?per_page=100";
const categoriesContainer = document.querySelector(".categories-container");

async function displayCategories() {

    try {
        const response = await fetch(categoriesUrl);
        const categories = await response.json();
        console.log(categories);

        for (let i = 0; i < categories.length; i++) {

            if (categories[i].parent) {
                continue;
            }

            categoriesContainer.innerHTML += `<p><a href="category.html?id=${categories[i].id}">${categories[i].name}</a></p>`
        }
    }
    catch (error) {
        console.log(error);
    }
}

displayCategories()


// const mediaUrl = "https://nomadlife.tinadahl.no/wp-json/wp/v2/media?per_page=100";

// const json = await (await fetch(url + key)).json();
// const jsonSorted = json.sort((a, b) => a - b);

// const lifestyleUrl =
