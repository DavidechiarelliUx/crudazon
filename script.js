const URL = "https://striveschool-api.herokuapp.com/api/product/";
const formBackOffice = document.getElementById("back-officeForm");
const submitBtn = document.getElementById("submit-btn");
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNWMwM2I3NDcwMTAwMTU4YjJiMDgiLCJpYXQiOjE3Mzc3MTA1OTUsImV4cCI6MTczODkyMDE5NX0.J-aIztYMW7k1xAMVUhZbzNCNiOaUwzm2fLUcpZ8iMfM";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (productId) {
  fetch(URL + productId, {
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

      formBackOffice.elements.name.value = product.name || "";
      formBackOffice.elements.description.value = product.description || "";
      formBackOffice.elements.brand.value = product.brand || "";
      formBackOffice.elements.imageUrl.value = product.imageUrl || "";
      formBackOffice.elements.price.value = product.price || "";

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

        fetch(URL + productId, {
          method: "PUT",

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
            window.location.href = "./home.html";
          });
      };
      const deleteBtn = document.getElementById("delete-btn");

      deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const confirmDelete = confirm("sicuro che vuoi eliminare?");

        if(confirmDelete){
            
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
            alert("prodotto non eliminato !");
        }
      });
    })
    .catch((error) => {
      console.error("cè stato un errore nella chiamata", error);
    });
} else {
  formBackOffice.onsubmit = function (e) {
    e.preventDefault();

    const newProduct = {
      name: formBackOffice.elements.name.value,
      description: formBackOffice.elements.description.value,
      brand: formBackOffice.elements.brand.value,
      imageUrl: formBackOffice.elements.imageUrl.value,
      price: parseInt(formBackOffice.elements.price.value),
    };

    console.log("Nuovo prodotto da creare:", newProduct);

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
          throw new Error("Errore durante la creazione del prodotto");
        }
      })
      .then((createdProduct) => {
        console.log("Prodotto creato con successo:", createdProduct);

        window.location.href = "./home.html";
      })
      .catch((error) => {
        console.error("Errore durante la creazione del prodotto:", error);
      });
  };
}

