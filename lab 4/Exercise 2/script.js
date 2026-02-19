let searchInput = document.getElementById("search");
let resultsDiv = document.getElementById("results");

let debounceTimer;


// DEBOUNCING

searchInput.addEventListener("keyup", function(){

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {

        let query = searchInput.value.toLowerCase();

        if(query.length == 0){
            resultsDiv.innerHTML="";
            return;
        }

        // SHOW LOADING
        resultsDiv.innerHTML=
        "<div class='loading'><div class='spinner'></div><p>Searching...</p></div>";

        // Artificial delay
        setTimeout(()=>{
            fetchProducts(query);
        },1000);

    },700);   // debounce delay

});


// AJAX REQUEST

function fetchProducts(query){

fetch("products.json")
.then(response => {

    if(!response.ok){
        throw new Error("Failed to fetch data");
    }

    return response.json();
})

.then(data => {

    let filtered=data.products.filter(product=>
        product.name.toLowerCase().includes(query)
    );

    displayResults(filtered);

})

.catch(error => {

    resultsDiv.innerHTML=
    "<p class='error'>Unable to load products. Try again!</p>";

});

}


// DISPLAY RESULTS

function displayResults(products){

    resultsDiv.innerHTML="";

    if(products.length==0){
        resultsDiv.innerHTML=
        "<p class='noresult'>No results found</p>";
        return;
    }

    products.forEach(product=>{

        resultsDiv.innerHTML+=
        `<div class="product">
        <h4>${product.name}</h4>
        <p>Price: ₹${product.price}</p>
        <p>Category: ${product.category}</p>
        </div>`;

    });

}
