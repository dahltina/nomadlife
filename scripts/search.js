const allPostsUrl = "https://nomadlife.tinadahl.no/wp-json/wp/v2/posts/?per_page=100&_embed";
const searchResults = document.querySelector(".search-results");
const searchContainer = document.querySelector(".search-wrapper");
const exitSearch = document.querySelector(".fa-times");
const searchIcon = document.querySelector(".fa-search");
const searchBar = document.querySelector("#search");
let allPosts = [];

searchBar.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredPosts = allPosts.filter( post => {
        return (
            post.title.rendered.toLowerCase().includes(searchString) ||
            post.excerpt.rendered.toLowerCase().includes(searchString) ||
            post.content.rendered.toLowerCase().includes(searchString)
        );
    });
    displayResults(filteredPosts);
});

const loadPosts = async () => {
    try {
        const results = await fetch(allPostsUrl);
        allPosts = await results.json();
    }
    catch(error) {
        console.log(error);
    }
}

loadPosts();

const displayResults = (posts) => {

    const newDate = new Date(posts.date).toLocaleString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const htmlString = posts
        .map((posts) => {
            return (
            `<a href="post.html?id=${posts.id}">
                <div class="search-box">
                    <div class="box-text box-text-one">
                        <h3 class="carousel-text post-h3">${posts.title.rendered}</h3>
                        <p class="date">${newDate}</p>
                        <p class="excerpt">${posts.excerpt.rendered}</p>
                        <div class="thin line blog-page-line search-line"></div>
                    </div>
                </div>
            </a>`);
        })
        .join('');
        searchResults.innerHTML = htmlString;
}


exitSearch.onclick = function (e) {
    searchContainer.style.display = "none";
    exitSearch.style.display = "none";
    searchBar.value = "";
    searchResults.innerHTML = "";
}

searchIcon.onclick = function (e) {
    searchContainer.style.display = "block";
    exitSearch.style.display = "block";
}
