const api = "/books";

let page = 1;

function displayBooks(data, append = false) {
  let container = document.getElementById("books");

  if (!append) container.innerHTML = "";

  data.forEach((book) => {
    container.innerHTML += `

<div class="book-card">

<h3>${book.title}</h3>

<p>Author: ${book.author}</p>

<p>Category: ${book.category}</p>

<p>Price: ₹${book.price}</p>

<p>Rating: ${book.rating}</p>

</div>

`;
  });
}

function searchBooks() {
  const title = document.getElementById("searchTitle").value;

  fetch(`/books/search?title=${title}`)
    .then((res) => res.json())

    .then(displayBooks);
}

function filterCategory() {
  const category = document.getElementById("category").value;

  fetch(`/books/category/${category}`)
    .then((res) => res.json())

    .then(displayBooks);
}

function sortPrice() {
  fetch("/books/sort/price")
    .then((res) => res.json())

    .then(displayBooks);
}

function sortRating() {
  fetch("/books/sort/rating")
    .then((res) => res.json())

    .then(displayBooks);
}

function topBooks() {
  fetch("/books/top")
    .then((res) => res.json())

    .then(displayBooks);
}

function loadMore() {
  fetch(`/books?page=${page}`)
    .then((res) => res.json())

    .then((data) => {
      if (data.length === 0) {
        alert("No more books to load");
        return;
      }

      displayBooks(data, true);

      page++;
    });
}

loadMore();
