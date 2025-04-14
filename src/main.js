"use strict";
import "./style.css";

const furnitureList = document.querySelector(".furniture-list");
const pictire = document.querySelector(".furniture-picture");
const name = document.querySelector(".furniture-name");
const price = document.querySelector(".furniture-price");

// function capitalizeFirst(str) {
//   if (!str) return "";
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }

function capitalizeEveryWord(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

fetch(
  // "https://www.course-api.com/react-store-single-product?id=recd1jIVIEChmiwhe"
  "https://www.course-api.com/react-store-products"
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    data.forEach((furniture) => {
      let item = document.createElement("li");
      item.innerHTML = `<img
            src="${furniture.image}"
            alt="Furniture-Picture"
            class="furniture-picture"
            style="display: block"
          />
          <div class="furniture-item-info">
            <h3 class="furniture-name">${capitalizeEveryWord(
              furniture.name
            )}</h3>
            <h3 class="furniture-price">${+furniture.price / 100} $</h3>
          </div>`;
      item.className = "furniture-item";
      furnitureList.appendChild(item);
    });
  })
  .catch((error) => console.error(error));
