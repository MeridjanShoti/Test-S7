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
      backofficeForm.elements.name.value = product.name;
      console.log(backofficeForm);
    });

  backofficeForm.onsubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      productName: document.getElementById("productName").value,
      productDescription: document.getElementById("productDescription").value,
      productBrand: document.getElementById("productName").value,
      productImg: document.getElementById("productImg").value,
      productPrice: document.getElementById("productPrice").value,
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
        console.log(product);
      })
      .catch((error) => console.log(error));
  };
}
