console.log("READY");

let products = document.querySelector(".row.data");
import data from "./data.json" assert { type: "json" };

data.forEach((product) => {
  // creando los nodos y agregando sus clases y propiedades manualmente:
  let fragment = document.createDocumentFragment(); // fragmento con cada div contenedor del producto (no ocupa un nodo en el documento)
  let container = document.createElement("DIV");
  container.classList.add("col-md-6", "col-lg-4");
  let subcontainer = document.createElement("DIV");
  subcontainer.classList.add("box");
  let imgbox = document.createElement("DIV");
  imgbox.classList.add("img-box");
  let detailbox = document.createElement("DIV");
  detailbox.classList.add("detail-box");
  let img = document.createElement("IMG");
  img.src = product.img;
  let desc = document.createElement("H5");
  desc.textContent = product.description;
  let pricebox = document.createElement("DIV");
  pricebox.classList.add("price_box");
  let priceheading = document.createElement("H6");
  priceheading.classList.add("price_heading");
  let link = document.createElement("A");
  link.textContent = "Buy Now";
  link.setAttribute("href", "https://api.whatsapp.com/send?phone=573174500270");
  link.setAttribute("target", "_blank");
  let span = document.createElement("SPAN");
  span.textContent = "$";
  let price = document.createTextNode("' 100.00 '"); // nodo de texto
  console.log({ fragment, container, subcontainer });
  // finalmente anidamos todos los nodos y tenemos un resultado equivalente a innerHTML
  priceheading.append(span, price);
  pricebox.append(priceheading, link);
  detailbox.append(desc, pricebox);
  imgbox.appendChild(img);
  subcontainer.append(imgbox, detailbox);
  container.appendChild(subcontainer);
  fragment.appendChild(container);
  products.appendChild(fragment);

  // La diferencia entre append y appendChild es que el primero nos permite anidar mas de un nodo a la vez y tambien permite nodos de texto
// appendChild solo permite 1 elemento y no puede ser Textnode.
});

const paginationNumbers = document.getElementById("pagination-numbers");
//const paginatedList = document.querySelector("col-md-6.col-lg-4");
//const listItems = paginatedList.querySelectorAll("li");
const listItems = products.querySelectorAll(".col-md-6.col-lg-4");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

console.log(listItems)

const paginationLimit = 2;
const pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage = 1;

const disableButton = (button) => {
  button.classList.add("disabled");
  button.setAttribute("disabled", true);
};

const enableButton = (button) => {
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
};

const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }

  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
};

const handleActivePageNumber = () => {
  document.querySelectorAll(".pagination-number").forEach((button) => {
    button.classList.remove("active");
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex == currentPage) {
      button.classList.add("active");
    }
  });
};

const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = "pagination-number";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", "Page " + index);

  paginationNumbers.appendChild(pageNumber);
};

const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handleActivePageNumber();
  handlePageButtonsStatus();
  
  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  listItems.forEach((item, index) => {
    item.classList.add("hidden");
    if (index >= prevRange && index < currRange) {
      item.classList.remove("hidden");
    }
  });
};

window.addEventListener("load", () => {
  getPaginationNumbers();
  setCurrentPage(1);

  prevButton.addEventListener("click", () => {
    setCurrentPage(currentPage - 1);
  });

  nextButton.addEventListener("click", () => {
    setCurrentPage(currentPage + 1);
  });

  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));

    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
      });
    }
  });
});


