// Function to fetch the HTML file content
function fetchHTMLFile(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            // Get the reference to the target div
            const contentDiv = document.getElementById('footerContentDiv');

            // Set the fetched HTML content as innerHTML of the div
            contentDiv.innerHTML += data;
        })
        .catch(error => console.log(error));
}

// Call the fetchHTMLFile function with the HTML file URL
fetchHTMLFile('/zombieland/js/load-footer-markup.txt?1');



//window.addEventListener('load', function () {
//    var iconsData = [
//        { iconClass: "fa fa-eye fa-lg", url: "../rss-viewer.html" },
//        { iconClass: "fas fa-rss fa-lg", url: "../feed.xml" },
//        { iconClass: "fas fa-download fa-lg", url: "/resume/shane-brumback-resume.pdf" },
//        { iconClass: "fas fa-comment fa-lg", url: "../contact-me.html" }
//    ];

//    // Create a new div for the icons container
//    var iconsContainer = document.createElement("div");
//    iconsContainer.style.position = "fixed";
//    iconsContainer.style.bottom = "20%";
//    iconsContainer.style.left = "0";
//    iconsContainer.style.width = "100%";
//    iconsContainer.style.backgroundColor = "lightgray";
//    iconsContainer.style.display = "flex";
//    iconsContainer.style.justifyContent = "center";
//    iconsContainer.style.padding = "10px";

//    iconsData.forEach(function (iconData) {
//        var iconLink = document.createElement("a");
//        iconLink.href = iconData.url;
//        iconLink.target = "_blank";

//        var iconElement = document.createElement("i");
//        iconElement.className = iconData.iconClass;
//        iconElement.style.fontSize = "24px"; // Set the font size to 24px

//        iconLink.appendChild(iconElement);
//        iconsContainer.appendChild(iconLink);
//    });

//    // Append the icons container to the body of the document
//    document.body.appendChild(iconsContainer);
//});
