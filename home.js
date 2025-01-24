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
        const nameProduct=document.createElement("h3");
        const priceProduct=document.createElement("p");
        const editBtn = document.createElement("button");
        
        col.classList.add("col", "mt-5");
        card.classList.add("card", "border", "border-light","bg-dark");
        imageProduct.classList.add("card-img-top", "img-fluid", "object-fit-cover");
        cardBody.classList.add("card-body");
        nameProduct.classList.add("text-light");
        priceProduct.classList.add("text-light");
        editBtn.classList.add("btn", "btn-outline-warning");

        imageProduct.src=element.imageUrl;
        nameProduct.textContent=element.name;
        priceProduct.textContent=`${element.price} €`;
        editBtn.textContent="edit"

        cardBody.append(nameProduct, priceProduct, editBtn);
        card.append(imageProduct, cardBody);
        col.appendChild(card);
        row.appendChild(col);

        editBtn.addEventListener("click", (e)=>{
            e.preventDefault();
            window.location.href="./index.html"
            // window.location.href = "./index.html",
        })
    });
})
.catch(error => {
    console.error("cè stato un errore nella chiamata", error);
})
// <div class="card">
// <img src="..." class="card-img-top img-fluid object-fit-cover" style="height:250px; width: 100%; "alt="product" />
// <div class="card-body">
//   <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
// </div>
