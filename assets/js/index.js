const row = document.getElementById("cardContainer");
fetch("https://striveschool-api.herokuapp.com/api/product/", {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNmU2ZGI3NDcwMTAwMTU4YjJiOTgiLCJpYXQiOjE3Mzc3MTUzMDksImV4cCI6MTczODkyNDkwOX0.WTRnC2bHipbz_gG9ajIUdn6kzhAZhv1L3u1JzIUvL2o",
  },
})
  .then((response) => {
    console.log(response.ok);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error();
    }
  })
  .then((striveData) => {
    console.log(striveData);
    row.innerHTML = "";
    striveData.forEach((product) => {
      const col = document.createElement("div");
      col.classList.add("col-md-4");
      const card = document.createElement("div");
      card.classList.add("card", "mb-4", "shadow-sm");
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      const img = document.createElement("img");
      img.src = product.imageUrl;
      img.alt = product.name + "preview";
      img.classList.add("bd-placeholder-img", "card-img-top");
      const title = document.createElement("h5");
      title.classList.add("card-title");
      title.innerText = product.name;
      const cardText = document.createElement("p");
      cardText.classList.add("card-text");
      cardText.innerText = product.description;
      const bigContainer = document.createElement("div");
      bigContainer.classList.add("d-flex", "justify-content-between", "align-items-center");
      const btnGroup = document.createElement("div");
      btnGroup.classList.add("btn-group");
      const viewBtn = document.createElement("button");
      viewBtn.type = "button";
      viewBtn.classList.add("btn", "btn-sm", "btn-outline-secondary");
      viewBtn.innerText = "Dettagli";
      const modifyBtn = document.createElement("button");
      modifyBtn.type = "button";
      modifyBtn.classList.add("btn", "btn-sm", "btn-outline-secondary");
      modifyBtn.innerText = "Modifica";
      const productPrice = document.createElement("small");
      productPrice.classList.add("text-muted");
      productPrice.innerText = "prezzo: " + product.price + "€";

      row.appendChild(col);
      col.appendChild(card);
      card.appendChild(img, cardBody);
      card.appendChild(cardBody);
      cardBody.appendChild(title);
      cardBody.appendChild(cardText);
      cardBody.appendChild(bigContainer);
      bigContainer.appendChild(btnGroup);
      bigContainer.appendChild(productPrice);
      btnGroup.appendChild(viewBtn);
      btnGroup.appendChild(modifyBtn);
      modifyBtn.addEventListener("click", () => {
        window.location.assign("./backoffice.html?productId=" + product._id);
      });
      viewBtn.onclick = () => {
        window.location.assign("./details.html?productId=" + product._id);
      };
    });
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    isLoading(false);
  });
const isLoading = function (loadingState) {
  const loading = document.querySelector(".loading-border");
  if (loadingState) {
    loading.classList.remove("d-none");
  } else {
    loading.classList.add("d-none");
  }
};
