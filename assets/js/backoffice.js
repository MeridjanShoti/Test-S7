const backofficeForm = document.getElementById("backofficeForm");
const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");
const resetBtn = document.getElementById("resetBtn");
const submitBtn = document.getElementById("insertBtn");
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
      } else {
        throw new Error();
      }
    })
    .then((product) => {
      document.getElementById("productName").value = product.name;
      document.getElementById("productDescription").value = product.description;
      document.getElementById("productBrand").value = product.brand;
      document.getElementById("productImg").value = product.imageUrl;
      document.getElementById("productPrice").value = product.price;
      document.getElementById("insertBtn").innerText = "Modifica";
      resetBtn.innerText = "Elimina Prodotto";
      resetBtn.type = "button";
    })
    .catch((error) => console.log(error));
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
      if (submitBtn.innerText === "Modifica") {
        alert("Prodotto aggiornato correttamente");
      } else {
        alert("Prodotto aggiunto correttamente");
      }
      backofficeForm.reset();
    })
    .catch((error) => console.log(error));
};
resetBtn.addEventListener("click", (e) => {
  if (resetBtn.innerText === "Annulla") {
    if (confirm("vuoi ripartire da 0?")) {
      backofficeForm.reset();
    } else {
      e.preventDefault();
    }
  } else {
    if (confirm("vuoi eliminare il prodotto?")) {
      fetch(URL, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNmU2ZGI3NDcwMTAwMTU4YjJiOTgiLCJpYXQiOjE3Mzc3MTUzMDksImV4cCI6MTczODkyNDkwOX0.WTRnC2bHipbz_gG9ajIUdn6kzhAZhv1L3u1JzIUvL2o",
        },
      })
        .then((response) => {
          if (response.ok) {
            alert("elemento eliminato correttamente");
          } else {
            alert("errore nell'eliminazione");
            throw new Error();
          }
        })
        .catch((error) => console.log(error));
    }
  }
});
