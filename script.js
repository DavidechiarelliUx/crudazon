const URL = "https://striveschool-api.herokuapp.com/api/product/";

const formBackOffice = document.getElementById("back-officeForm");
const submitBtn = document.getElementById("submit-btn");
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNWMwM2I3NDcwMTAwMTU4YjJiMDgiLCJpYXQiOjE3Mzc3MTA1OTUsImV4cCI6MTczODkyMDE5NX0.J-aIztYMW7k1xAMVUhZbzNCNiOaUwzm2fLUcpZ8iMfM";

fetch(URL, {
  method: "GET",
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
  .then((product) => {
    console.log(product);

    formBackOffice.elements.name.value =product.name || "";
    formBackOffice.elements.description.value =product.description || "";
    formBackOffice.elements.brand.value =product.brand || "";
    formBackOffice.elements.imageUrl.value =product.imageUrl || "";
    formBackOffice.elements.price.value =product.price || "";

    formBackOffice.onsubmit = function (e) {
      e.preventDefault();

      const newProduct = {
        name: formBackOffice.elements.name.value,
        description: formBackOffice.elements.description.value,
        brand: formBackOffice.elements.brand.value,
        imageUrl: formBackOffice.elements.imageUrl.value,
        price: parseInt(formBackOffice.elements.price.value),
      };

      console.log(newProduct);

      fetch(URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(newProduct),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Errore nel caricamento della pagina");
          }
        })
        .then((addProduct) => {
          console.log("dati del prodotto ricevuti : ", addProduct);
        })
    };
  })
  .catch((error) => {
    console.error("cè stato un errore nella chiamata", error);
  });
