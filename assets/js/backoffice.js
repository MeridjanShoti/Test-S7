const backofficeForm = document.getElementById("backofficeForm");
const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");
const URL = productId? "https://striveschool-api.herokuapp.com/api/product/" + productId
fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "GET",
    headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNmU2ZGI3NDcwMTAwMTU4YjJiOTgiLCJpYXQiOjE3Mzc3MTUzMDksImV4cCI6MTczODkyNDkwOX0.WTRnC2bHipbz_gG9ajIUdn6kzhAZhv1L3u1JzIUvL2o"
    }
    }).then(response => {
        if (response.ok){
            return response.json()
        }
    }).then(product => {
        console.log(product)
    })