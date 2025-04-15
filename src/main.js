"use strict";
import "./style.css";

const furnitureList = document.querySelector(".furniture-list");

const heading = document.querySelector(".heading");
const container = document.querySelector(".container");
const singleProductCont = document.querySelector(".single-product");

function capitalizeEveryWord(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function displayProducts(data) {
  data.forEach((product) => {
    let item = document.createElement("li");
    item.innerHTML = `<img
          src="${product.image}"
          alt="Furniture-Picture"
          class="furniture-picture"
          style="display: block"
        />
        <div class="furniture-item-info">
          <h3 class="furniture-name">${capitalizeEveryWord(product.name)}</h3>
          <h3 class="furniture-price">${+product.price / 100} $</h3>
        </div>`;
    item.className = "furniture-item";
    item.setAttribute("data-id", product.id);
    furnitureList.appendChild(item);
  });
}

function displaySingleProduct(data) {
  singleProductCont.innerHTML = "";
  let item = document.createElement("div");
  item.innerHTML = `<div class="pictures-cont">
    <img
      src="${data.images[0].url}"
      alt="Furniture-Picture"
      class="product-img"
      style="display: block"
    />

    <div class="side-pictures">
      <img
        src="${data.images[0].url}"
        alt="Furniture-Picture"
        class="side-img"
        style="display: block"
      />
      <img
        src="${data.images[1].url}"
        alt="Furniture-Picture"
        class="side-img"
        style="display: block"
      />
      <img
        src="${data.images[2].url}"
        alt="Furniture-Picture"
        class="side-img"
        style="display: block"
      />
      <img
        src="${data.images[3].url}"
        alt="Furniture-Picture"
        class="side-img"
        style="display: block"
      />
      <img
        src="${data.images[4].url}"
        alt="Furniture-Picture"
        class="side-img"
        style="display: block"
      />
    </div>
  </div>

  <div class="info-cont">
    <h1 class="single-product-name">${capitalizeEveryWord(data.name)}</h1>

    <p class="description text">${data.description}</p>

    <p>Available: <span class="available-number">${data.stock}</span></p>

    <p>Brand: <span class="brand-name">${data.company}</span></p>

    <button class="back-btn">BACK</button>
  </div>`;

  item.className = "single-product-item";
  item.setAttribute("data-id", data.id);
  singleProductCont.appendChild(item);
}

async function fetchData() {
  try {
    const response = await fetch(
      "https://www.course-api.com/react-store-products"
    );

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await response.json();
    displayProducts(data);
  } catch (error) {
    console.error(error);
  }
}

fetchData();

furnitureList.addEventListener("click", function (e) {
  console.log(e.target.closest(".furniture-item").dataset.id);

  const productId = e.target.closest(".furniture-item").dataset.id;
  heading.classList.add("hidden");
  container.classList.add("hidden");
  singleProductCont.classList.remove("hidden");

  fetch(`https://www.course-api.com/react-store-single-product?id=${productId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not fetch resource");
      }

      return response.json();
    })
    .then((data) => displaySingleProduct(data))
    .catch((error) => console.error(error));
});

singleProductCont.addEventListener("click", function (e) {
  // prettier-ignore
  if (!e.target.classList.contains("side-img") && !e.target.classList.contains("back-btn")) return;

  if (e.target.classList.contains("side-img")) {
    const pictureSrc = e.target.src;
    const productImg = singleProductCont.querySelector(".product-img");
    productImg.src = pictureSrc;
  }

  if (e.target.classList.contains("back-btn")) {
    heading.classList.remove("hidden");
    container.classList.remove("hidden");
    singleProductCont.classList.add("hidden");
  }
});
