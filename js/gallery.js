"use strict";

/**
  |============================
  | Gallery items
  |============================
*/
const images = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

/**
  |==================================
  | DOM element and add markup
  |==================================
*/
const galleryImg = document.querySelector(".gallery");

galleryImg.innerHTML = images.reduce(
  (html, { preview, original, description }) =>
    html +
    `<li class="gallery-item">
      <a class="gallery-link" href="${original}">
       <img class="gallery-image"
       src="${preview}"
       data-source="${original}"
       alt="${description}"
       />
      </a>
    </li>`,
  ""
);

/**
  |========================================================================================================
  | We attach an event handler to ul.gallery and run the function to open the basicLightbox modal window
  |========================================================================================================
*/
galleryImg.addEventListener("click", clickImg);

let modal = null; //variable that is used in the clickImg function, we place it in the global scope to have access to it

function clickImg(event) {
  event.preventDefault(); // Preventing standard behavior (page reload)
  const imgSource = event.target.dataset.source; // getting a big picture
  const description = event.target.alt; // getting descriptions for pictures

  if (event.currentTarget === event.target) {
    return;
  } //checking whether the list element itself was clicked

  {
    modal = basicLightbox.create(
      //create an instance of the modal window class
      `
        <img src="${imgSource}" alt="${description}" />`, //insert a link to a large image and description
      {
        onShow: (modal) => {
          window.addEventListener("keydown", escKeyPress);
        }, //the onShow option, according to the documentation, will perform the action of opening the modal window, setting the “key click” event and the escKeyPress function—pressing the Escape key
        onClose: (modal) => {
          window.removeEventListener("keydown", escKeyPress);
        }, //the onClose option, according to the documentation, will perform actions until the modal window is closed, remove the “key click” event and the escKeyPress function - pressing the Escape key
      }
    );
    modal.show(); // The show() option according to the documentation shows a modal window
  }
  return;
}

/**
  |=================================================================
  | Function when pressing the Escape key, the modal window closes
  |=================================================================
*/
function escKeyPress(event) {
  if (event.code === "Escape") {
    modal.close();
  } 
}