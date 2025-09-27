// gridGenerator.js

// JSON data for the books
// JSON data for the books
const booksData = [
    {
        title: "Learn Three.js Programming",
        imageUrl: "https://m.media-amazon.com/images/I/61jLkpAdj0L._SY466_.jpg",
        description: "Create stunning 3D animations and visualizations using JavaScript and Three.js.",
        link: "https://www.amazon.com/Learn-Three-js-Programming-animations-visualisations/dp/1803233877?hvadid=642056846337&hvpos=&hvnetw=g&hvrand=9329570757509077921&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9027204&hvtargid=pla-1879880903016&psc=1&gclid=Cj0KCQjwmvSoBhDOARIsAK6aV7jJbN6XA5Mey3HzYFU5Y_M88o1yaQWN-k_HxHPrpZvXj-Y5f35IozoaAt6BEALw_wcB&linkCode=li2&tag=shopthespark-20&linkId=33f36426b4477f3d825c47d1fa730ecb&language=en_US&ref_=as_li_ss_il"
    },
    {
        title: "Game Development with Three.js",
        imageUrl: "https://m.media-amazon.com/images/I/51-bumnFteL._SX342_SY445_.jpg",
        description: "Explore Three.js, the JavaScript library for 3D graphics and game development.",
        link: "https://www.amazon.com/Game-Development-Three-js-Isaac-Sukin-ebook/dp/B00G58JD4K?crid=9ARPT2BHSSGX&keywords= three.js&qid=1696458114&s=books&sprefix=three.js%2Cstripbooks%2C109&sr=1-3&linkCode=li2&tag=shopthespark-20&linkId=3aa4d432eef351a40f4cf9a08beb9977&language=en_US&ref_=as_li_ss_il"
    },
    {
        title: "Three.js Cookbook",
        imageUrl: "https://m.media-amazon.com/images/I/51295pbTd3L._SX342_SY445_.jpg",
        description: "A comprehensive guide to creating 3D graphics and visualizations using Three.js.",
        link: "https://www.amazon.com/Three-js-Cookbook-Jos-Dirksen-ebook/dp/B00T0C8EMA?crid=9ARPT2BHSSGX&keywords=three.js&qid=1696458138&s=books&sprefix= three.js%2Cstripbooks%2C109&sr=1-5&linkCode=li2&tag=shopthespark-20&linkId=3f9dd239bdf28f0437d5d061ee9de391&language=en_US&ref_=as_li_ss_il"
    },
    {
        title: "Using WebXR API",
        imageUrl: "https://m.media-amazon.com/images/I/61Z0yWCpRGL._SY466_.jpg",
        description: "Dive into immersive frame-based AR and VR development with WebXR.",
        link: "https://www.amazon.com/Using-WebXR-API-Immersive-Frame-ebook/dp/B08PCPCNL8?pd_rd_w=f8Dfh&content-id=amzn1.sym.eb616d98-73b6-4f12-8913-a35cc29165e9&pf_rd_p=eb616d98-73b6-4f12-8913-a35cc29165e9&pf_rd_r=FGRRQQCB370GKYZTZZGC&pd_rd_wg=3c3gM&pd_rd_r=5fce8b6d-685f-4aa2-852c-9316e66931bf&pd_rd_i=B08PCPCNL8&psc=1&linkCode=li2&tag=shopthespark-20&linkId=41682e0089cae831f1a275a7e27d3459&language=en_US&ref_=as_li_ss_il"
    },
    {
        title: "Real-Time 3D Graphics with WebGL 2",
        imageUrl: "https://m.media-amazon.com/images/I/81o+O6xYj1L._SY466_.jpg",
        description: "Build interactive 3D applications with JavaScript and WebGL 2 (OpenGL ES 3.0), 2nd Edition 2nd Edition, Kindle Edition",
        link: "https://amzn.to/3S5CAev"
    },
    {
        title: "Learn Three.js: Programming 3D animations and visualizations for the web with HTML5 and WebGL, 3rd Edition",
        imageUrl: "https://m.media-amazon.com/images/I/6119OHoqLDL._SY466_.jpg",
        description: "Learn Three.js: Programming 3D animations and visualizations for the web with HTML5 and WebGL, 3rd Edition Kindle Edition",
        link: "https://www.amazon.com/Learn-Three-js-Programming-animations-visualizations-ebook/dp/B07H2WJD1P/ref=d_reads_cwrtbar_sccl_1_1/136-1998611-4756403?pd_rd_w=9PloA&amp;content-id=amzn1.sym.eb5dde69-fb4b-4958-92c6-5fa677741093&amp;pf_rd_p=eb5dde69-fb4b-4958-92c6-5fa677741093&amp;pf_rd_r=FXEPJZDN3BHT78QWDM7C&amp;pd_rd_wg=CX2jv&amp;pd_rd_r=f269d774-13e4-4788-81ae-992ed69477ed&amp;pd_rd_i=B07H2WJD1P&amp;psc=1&_encoding=UTF8&tag=shopthespark-20&linkCode=ur2&linkId=085fff750f6d2cf224c650caa9a8fb36&camp=1789&creative=9325"
    },
    // Add more books here...
];

// Function to create a grid item for each book
function createGridItem(book) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");

    const link = document.createElement("a");
    link.href = book.link;
    link.target = "_blank";

    const image = document.createElement("img");
    image.classList.add("highlight-image");
    image.style.width = "25%";
    image.alt = book.title;
    image.src = book.imageUrl;

    const description = document.createElement("p");
    description.textContent = book.description;

    link.appendChild(image);
    link.appendChild(description);
    gridItem.appendChild(link);

    return gridItem;
}

// Get the target div
const targetDiv = document.getElementById("threejsads");

// Create and append grid items for each book
booksData.forEach((book) => {
    const gridItem = createGridItem(book);
    targetDiv.appendChild(gridItem);
});

// Add responsive styles based on screen width
function adjustGridColumns() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
        // For screens with a maximum width of 768px (mobile)
        targetDiv.style.display = 'block'; // Stack items
    } else {
        // For larger screens
        targetDiv.style.display = 'grid';
        targetDiv.style.gridTemplateColumns = 'repeat(3, 1fr)'; // Three columns
    }
}

// Call the function on page load and when the window is resized
window.onload = adjustGridColumns;
window.onresize = adjustGridColumns;
