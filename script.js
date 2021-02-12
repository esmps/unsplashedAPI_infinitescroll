const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API
const apiKey = 'ItT0Lwff-EXbuqhPKoAQ8bHjGnkDRZAw5834hujrZvk';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=30`;

//https://api.unsplash.com/photos/?client_id=ItT0Lwff-EXbuqhPKoAQ8bHjGnkDRZAw5834hujrZvk&count=30

//Check if all images are loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}
//Helper function to set attributes on DOM elements
function setAttributes(element, attributes){
    for (const key in attributes){
        element. setAttribute(key, attributes[key]);
    }
}

//create elements for links & photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //run function for each object in photosArray
    photosArray.forEach((photo) => {
        //creating <a> to link to Unsplash
        const item = document.createElement("a");
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank',
        })
        //creating <img> for photo
        const img = document.createElement("img");
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        //Event listener to check when each is finished loading
        img.addEventListener('load', imageLoaded);
        //put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
};

//Get photos from Unsplash API
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch(err){
        //catch error here
    }
};

//Check to see if scrolling near bottom of page -> Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos(); 
    }
});

//On load
getPhotos();