const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");
fetch("https://striveschool-api.herokuapp.com/api/product/" + productId, {
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
      throw new erros();
    }
  })
  .then((product) => {
    product;
  });
