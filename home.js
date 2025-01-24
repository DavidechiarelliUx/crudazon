const URL = "https://striveschool-api.herokuapp.com/api/product/";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNWMwM2I3NDcwMTAwMTU4YjJiMDgiLCJpYXQiOjE3Mzc3MTA1OTUsImV4cCI6MTczODkyMDE5NX0.J-aIztYMW7k1xAMVUhZbzNCNiOaUwzm2fLUcpZ8iMfM";

fetch(URL, {
    headers: {
        Authorization:token
    }
})
.then(response => {

    if(response.ok){
        return response.json();
    }else{
        throw new Error("Errore nel caricamento della pagina");
    }
})
.then(card => {
    console.log(card);

    const row = document.getElementById("row");
    card.forEach(element => {
        
        console.log(element.imageUrl);

        const col = document.createElement("div")
        const card=document.createElement("div");
        const imageProduct=document.createElement("img");
        const cardBody=document.createElement("div");
        const nameProduct=document.createElement("p");
        const priceProduct=document.createElement("p");
        const editBtn = document.createElement("button");
        
        col.classList.add("col-12","col-sm-6", "col-md-4", "col-lg-3", "mt-5");
        card.classList.add("card", "border", "border-light","bg-dark");
        imageProduct.classList.add("card-img-top", "img-fluid", "object-fit-cover");
        cardBody.classList.add("card-body");
        nameProduct.classList.add("text-light");
        priceProduct.classList.add("text-light");
        editBtn.classList.add("btn", "btn-outline-warning");

        imageProduct.src=element.imageUrl;
        imageProduct.style.height = "250px";
        imageProduct.style.width = "100%";
        nameProduct.textContent=element.name;
        priceProduct.textContent=`${element.price} €`;
        editBtn.textContent="edit"

        cardBody.append(nameProduct, priceProduct, editBtn);
        card.append(imageProduct, cardBody);
        col.appendChild(card);
        row.appendChild(col);

        card.addEventListener("click", (e)=>{

            e.preventDefault();
            window.location.href=`./details.html?id=${element._id}`
        })
        editBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.location.href = `./index.html?id=${element._id}`;
        });
    });
})
.catch(error => {
    console.error("cè stato un errore nella chiamata", error);
})
.finally(()=> {
    isLoading(false);
})

const isLoading = function (loadingState) {
  const spinner = document.querySelector(".spinner-border");
  if (loadingState) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};