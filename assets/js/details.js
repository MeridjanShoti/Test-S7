const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");
const details = document.getElementById("details");
fetch("https://striveschool-api.herokuapp.com/api/product/" + productId, {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNmU2ZGI3NDcwMTAwMTU4YjJiOTgiLCJpYXQiOjE3Mzc3MTUzMDksImV4cCI6MTczODkyNDkwOX0.WTRnC2bHipbz_gG9ajIUdn6kzhAZhv1L3u1JzIUvL2o",
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error();
    }
  })
  .then((product) => {
    const title = document.createElement("h1");
    title.classList.add("text-center");
    title.innerText = product.name;
    const img = document.createElement("img");
    img.src = product.imageUrl;
    img.classList.add("img-fluid");
    img.alt = product.name;
    const brand = document.createElement("h3");
    brand.classList.add("text-center");
    brand.innerText = product.brand;
    const description = document.createElement("p");
    description.innerText = product.description;
    const price = document.createElement("p");
    price.innerText = "prezzo: " + product.price + "€";

    details.appendChild(title);
    details.appendChild(img);
    details.appendChild(brand);
    details.appendChild(description);
    details.appendChild(price);
  })
  .catch((error) => console.log(error));
