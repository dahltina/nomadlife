
// carousel index page

const url = "https://nomadlife.tinadahl.no/wp-json/wp/v2/posts/?_embed";

const carouselContainer = document.querySelector(".carousel-container");

async function getLatestPosts() {

    try {
        const response = await fetch(url);
        const results = await response.json();
        displayCarousel(results);
        console.log(results);
    }
    catch (error) {
        console.log(error);
    }
}

getLatestPosts()

function displayCarousel(post) {

    for (let i = 0; i < post.length; i++) {

        if (i === 5) {
            break;
        }

        carouselContainer.innerHTML += `<a href="post.html?id=${post[i].id}" class="carousel">
                                            <section>
                                                <img class="carousel-image" src="${post[i]._embedded['wp:featuredmedia']['0'].source_url}" alt="${post[i]._embedded['wp:featuredmedia']['0'].alt_text}">
                                                <div class="overlay">
                                                    <h3 class="carousel-text">${post[i].title.rendered}</h3>
                                                    <p class="carousel-text">${post[i].excerpt.rendered}</p>
                                                </div>
                                            </section>
                                        </a>
                                    </div>`
    }
}

const nextBtn = document.querySelector(".arrow-right");
const previousBtn = document.querySelector(".arrow-left");
const slides = document.getElementsByClassName("slides");

let sliderIndex = 0;

previousBtn.addEventListener("click", function () {

    sliderIndex = (sliderIndex > 0) ? sliderIndex - 1 : 0;
    carouselContainer.style.transform = "translate(" + (sliderIndex) * -20 + "%)";
})

nextBtn.addEventListener("click", function () {

    sliderIndex = (sliderIndex < 4) ? sliderIndex + 1 : 4;
    carouselContainer.style.transform = "translate(" + (sliderIndex) * -20 + "%)";
})


// get popular posts

const urlBox1 = "https://nomadlife.tinadahl.no/wp-json/wp/v2/posts/50/?_embed";
const urlBox2 = "https://nomadlife.tinadahl.no/wp-json/wp/v2/posts/79/?_embed";
const urlBox3 = "https://nomadlife.tinadahl.no/wp-json/wp/v2/posts/90/?_embed";

const box1 = document.querySelector(".blog-post-box-one");
const box2 = document.querySelector(".blog-post-box-two");
const box3 = document.querySelector(".blog-post-box-three");

async function getPopularPost1() {

    try {
        const response = await fetch(urlBox1);
        const json = await response.json();

        const newDate = new Date(json.date).toLocaleString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        box1.innerHTML += ` <a class="blog-post-box" href="post.html?id=50">
                            <h2 class="h2-popular-posts margin-h2 full-width ">Popular Posts</h2>
                            <img src="${json._embedded['wp:featuredmedia']['0'].source_url}" class="box-image box-image-one" alt="${json._embedded['wp:featuredmedia']['0'].source_url}">
                            <div class="box-text box-text-one">
                                <h3 class="carousel-text post-h3">${json.title.rendered}</h3>
                                <p class="date">${newDate}</p>
                                <p class="excerpt">${json.excerpt.rendered}</p>
                            </div>
                        </a>`
    }

    catch (error) {
        console.log(error);
    }
}

getPopularPost1()

async function getPopularPost2() {

    try {
        const response = await fetch(urlBox2);
        const json = await response.json();

        const newDate = new Date(json.date).toLocaleString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        box2.innerHTML += ` <a class="blog-post-box" href="post.html?id=79">
                            <img src="${json._embedded['wp:featuredmedia']['0'].source_url}" class="box-image box-image-one">
                            <div class="box-text box-text-one">
                                <h3 class="carousel-text post-h3">${json.title.rendered}</h3>
                                <p class="date">${newDate}</p>
                                <p class="excerpt">${json.excerpt.rendered}</p>
                            </div>
                        </a>`
    }

    catch (error) {
        console.log(error);
    }
}

getPopularPost2()

async function getPopularPost3() {

    try {
        const response = await fetch(urlBox3);
        const json = await response.json();

        const newDate = new Date(json.date).toLocaleString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        box3.innerHTML += ` <a class="blog-post-box" href="post.html?id=90">
                            <img src="${json._embedded['wp:featuredmedia']['0'].source_url}" class="box-image box-image-one">
                            <div class="box-text box-text-one">
                                <h3 class="carousel-text post-h3">${json.title.rendered}</h3>
                                <p class="date">${newDate}</p>
                                <p class="excerpt">${json.excerpt.rendered}</p>
                            </div>
                        </a>`
    }

    catch (error) {
        console.log(error);
    }
}

getPopularPost3()

