"use strict";
import "./style.css";

const furnitureList = document.querySelector(".furniture-list");
const pictire = document.querySelector(".furniture-picture");
const name = document.querySelector(".furniture-name");
const price = document.querySelector(".furniture-price");

fetch(
  // "https://www.course-api.com/react-store-single-product?id=recd1jIVIEChmiwhe"
  "https://www.course-api.com/react-store-products"
)
  .then((response) => response.json())
  .then((data) => console.log(data[0].image))
  .catch((error) => console.error(error));
