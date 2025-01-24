const arrow = document.getElementById("arrow-back");

arrow.addEventListener("click", (e) => {
  e.preventDefault();

  window.location.href = "./home.html";
});

// riprende id dall href
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const URL = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNWMwM2I3NDcwMTAwMTU4YjJiMDgiLCJpYXQiOjE3Mzc3MTA1OTUsImV4cCI6MTczODkyMDE5NX0.J-aIztYMW7k1xAMVUhZbzNCNiOaUwzm2fLUcpZ8iMfM";
console.log(productId);

fetch(URL + productId, {
  headers: {
    Authorization: token,
  },
})
  .then((response) => {
    console.log(response);

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Errore nel caricamento della pagina");
    }
  })
  .then((detailsProduct) => {
    console.log(detailsProduct);

    const row = document.getElementById("row");

    const titleProduct = document.createElement("h1");
    const imageProduct = document.createElement("img");
    const descriptionProduct = document.createElement("p");
    const priceProduct = document.createElement("h3");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    const col = document.createElement("div");
    const divBtn = document.createElement("div");

    col.classList.add("col", "text-light", "d-flex", "flex-column", "align-center", "text-center");
    titleProduct.classList.add("fs-1");
    imageProduct.classList.add("img-fluid", "object-fit-cover", "my-3");
    descriptionProduct.classList.add("text-secondary");
    priceProduct.classList.add("text-light");
    divBtn.classList.add("d-flex", "justify-content-between");
    editBtn.classList.add("btn", "btn-outline-warning");
    deleteBtn.classList.add("btn", "btn-outline-danger");

    titleProduct.textContent = detailsProduct.name;
    imageProduct.src = detailsProduct.imageUrl;
    descriptionProduct.textContent = detailsProduct.description;
    priceProduct.textContent = `${detailsProduct.price} €`;
    editBtn.textContent = "edit product";
    deleteBtn.textContent = "delete product";

    divBtn.append(editBtn, deleteBtn);
    col.append(titleProduct, imageProduct, descriptionProduct, priceProduct, divBtn);
    row.appendChild(col);

    editBtn.addEventListener("click", (e) => {
      e.preventDefault();

      window.location.href = `./index.html?id=${detailsProduct._id}`;
    });
    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const confirmDelete = confirm("sicuro che vuoi eliminare?");

      if (confirmDelete) {
        fetch(URL + productId, {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        })
          .then((response) => {
            console.log(response);

            if (response.ok) {
              console.log("prodotto eliminato correttamente");
              window.location.href = "./home.html";
            } else {
              throw new Error("errore nella richiesta : ");
            }
          })
          .catch((error) => {
            console.error("errore nella choamata", error);
          });
      }else{
        alert("operazione annullata correttamente");
      }
    });
  })
  .catch((error) => {
    console.error("cè stato un errore di chiamata", error);
  });
