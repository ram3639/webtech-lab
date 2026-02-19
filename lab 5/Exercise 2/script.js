let xmlDoc;
let table = document.getElementById("bookTable");
let msg = document.getElementById("msg");

let editIndex = -1;
let deleteIndex = -1;

// LOAD XML

function loadXML() {
  let xhr = new XMLHttpRequest();

  xhr.open("GET", "books.xml", true);

  xhr.onload = function () {
    if (xhr.status == 200) {
      xmlDoc = xhr.responseXML;

      if (!xmlDoc) {
        msg.innerHTML = "Malformed XML (500)";
        msg.className = "error";
        return;
      }

      displayBooks();
    }
  };

  xhr.send();
}

// DISPLAY

function displayBooks() {
  table.innerHTML = "";

  let book = xmlDoc.getElementsByTagName("book");

  for (let i = 0; i < book.length; i++) {
    table.innerHTML += `<tr>
<td>${book[i].getElementsByTagName("id")[0].textContent}</td>
<td>${book[i].getElementsByTagName("title")[0].textContent}</td>
<td>${book[i].getElementsByTagName("author")[0].textContent}</td>
<td>${book[i].getElementsByTagName("status")[0].textContent}</td>
<td>
<button onclick="editBook(${i})">Edit</button>
<button onclick="deleteBook(${i})">Delete</button>
</td>
</tr>`;
  }
}

// ADD / UPDATE

function addBook() {
  let id = document.getElementById("id");
  let title = document.getElementById("title");
  let author = document.getElementById("author");
  let status = document.getElementById("status");

  if (
    id.value == "" ||
    title.value == "" ||
    author.value == "" ||
    status.value == ""
  ) {
    msg.innerHTML = "Fill All Fields (404)";
    msg.className = "error";
    return;
  }

  let book = xmlDoc.getElementsByTagName("book");

  // UPDATE
  if (editIndex != -1) {
    book[editIndex].getElementsByTagName("title")[0].textContent = title.value;

    book[editIndex].getElementsByTagName("author")[0].textContent =
      author.value;

    book[editIndex].getElementsByTagName("status")[0].textContent =
      status.value;

    msg.innerHTML = "Updated Successfully (200)";
    msg.className = "success";

    cancelEdit();
    displayBooks();
    return;
  }

  // DUPLICATE CHECK

  for (let i = 0; i < book.length; i++) {
    if (book[i].getElementsByTagName("id")[0].textContent == id.value) {
      msg.innerHTML = "Error 404: ID Exists";
      msg.className = "error";
      return;
    }
  }

  // CREATE

  let newBook = xmlDoc.createElement("book");

  ["id", "title", "author", "status"].forEach((tag) => {
    let node = xmlDoc.createElement(tag);

    let val = document.getElementById(tag).value;

    node.appendChild(xmlDoc.createTextNode(val));
    newBook.appendChild(node);
  });

  xmlDoc.getElementsByTagName("books")[0].appendChild(newBook);

  msg.innerHTML = "Added Successfully (200)";
  msg.className = "success";

  displayBooks();
  cancelEdit();
}

// EDIT

function editBook(i) {
  let book = xmlDoc.getElementsByTagName("book");

  document.getElementById("id").value =
    book[i].getElementsByTagName("id")[0].textContent;

  document.getElementById("title").value =
    book[i].getElementsByTagName("title")[0].textContent;

  document.getElementById("author").value =
    book[i].getElementsByTagName("author")[0].textContent;

  document.getElementById("status").value =
    book[i].getElementsByTagName("status")[0].textContent;

  document.getElementById("id").disabled = true;

  editIndex = i;
}

// CANCEL

function cancelEdit() {
  editIndex = -1;

  document.getElementById("id").disabled = false;

  document.getElementById("id").value = "";
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("status").value = "";
}

// DELETE

function deleteBook(i) {
  deleteIndex = i;

  document.getElementById("confirmBox").style.display = "block";
}

function confirmDelete() {
  let book = xmlDoc.getElementsByTagName("book")[deleteIndex];

  book.parentNode.removeChild(book);

  msg.innerHTML = "Deleted Successfully (200)";
  msg.className = "success";

  displayBooks();
  closeModal();
}

function closeModal() {
  document.getElementById("confirmBox").style.display = "none";
}

// INIT
loadXML();
