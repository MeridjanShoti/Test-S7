const backofficeForm = document.getElementById("backofficeForm");
const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");

const URL = productId
  ? "https://striveschool-api.herokuapp.com/api/product/" + productId
  : "https://striveschool-api.herokuapp.com/api/product/";
const insertProduct = document.getElementById("insertProduct");
if (productId) {
  fetch(URL, {
    method: "get",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNmU2ZGI3NDcwMTAwMTU4YjJiOTgiLCJpYXQiOjE3Mzc3MTUzMDksImV4cCI6MTczODkyNDkwOX0.WTRnC2bHipbz_gG9ajIUdn6kzhAZhv1L3u1JzIUvL2o",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((product) => {
      document.getElementById("productName").value = product.name;
      document.getElementById("productDescription").value = product.description;
      document.getElementById("productBrand").value = product.brand;
      document.getElementById("productImg").value = product.imageUrl;
      document.getElementById("productPrice").value = product.price;
      document.getElementById("insertBtn");
    });
}

backofficeForm.onsubmit = function (e) {
  e.preventDefault();
  const newProduct = {
    name: document.getElementById("productName").value,
    description: document.getElementById("productDescription").value,
    brand: document.getElementById("productBrand").value,
    imageUrl: document.getElementById("productImg").value,
    price: document.getElementById("productPrice").value,
  };

  fetch(URL, {
    method: productId ? "PUT" : "POST",
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
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
      (product.name = document.getElementById("productName").value),
        (product.description = document.getElementById("productDescription").value),
        (product.brand = document.getElementById("productBrand").value),
        (product.imageUrl = document.getElementById("productImg").value),
        (product.price = document.getElementById("productPrice").value);
    })
    .catch((error) => console.log(error));
};
