let productsData = [];
let table = document.getElementById("prodTable");
let msg = document.getElementById("msg");

let editIndex = -1;
let deleteIndex = -1;

// LOAD JSON

function loadProducts() {
  fetch("inventory.json")
    .then((res) => res.json())
    .then((data) => {
      productsData = data.products;
      displayProducts(productsData);
    })
    .catch(() => {
      msg.innerHTML = "JSON Error (500)";
      msg.className = "error";
    });
}

// DISPLAY

function displayProducts(list) {
  table.innerHTML = "";
  let total = 0;

  list.forEach((p, i) => {
    let rowClass = p.stock < 3 ? "lowStock" : "";

    table.innerHTML += `<tr class="${rowClass}">
<td>${p.id}</td>
<td>${p.name}</td>
<td>${p.category}</td>
<td>${p.price}</td>
<td>${p.stock}</td>
<td>
<button onclick="editProduct(${i})">Edit</button>
<button onclick="deleteProduct(${i})">Delete</button>
</td>
</tr>`;

    total += p.price * p.stock;
  });

  document.getElementById("totalValue").innerHTML = total;
}

// ADD / UPDATE

function addProduct() {
  let id = document.getElementById("id");
  let name = document.getElementById("name");
  let category = document.getElementById("category");
  let price = document.getElementById("price");
  let stock = document.getElementById("stock");

  if (
    id.value == "" ||
    name.value == "" ||
    category.value == "" ||
    price.value == "" ||
    stock.value == ""
  ) {
    msg.innerHTML = "Invalid Data (404)";
    msg.className = "error";
    return;
  }

  // UPDATE
  if (editIndex != -1) {
    productsData[editIndex].price = price.value;
    productsData[editIndex].stock = stock.value;

    msg.innerHTML = "Updated Successfully (200)";
    msg.className = "success";

    cancelEdit();
    displayProducts(productsData);
    return;
  }

  // DUPLICATE

  let exists = productsData.find((p) => p.id == id.value);

  if (exists) {
    msg.innerHTML = "Error 404: ID Exists";
    msg.className = "error";
    return;
  }

  // CREATE

  productsData.push({
    id: id.value,
    name: name.value,
    category: category.value,
    price: Number(price.value),
    stock: Number(stock.value),
  });

  msg.innerHTML = "Added Successfully (200)";
  msg.className = "success";

  displayProducts(productsData);
  cancelEdit();
}

// EDIT

function editProduct(i) {
  document.getElementById("id").value = productsData[i].id;
  document.getElementById("name").value = productsData[i].name;
  document.getElementById("category").value = productsData[i].category;
  document.getElementById("price").value = productsData[i].price;
  document.getElementById("stock").value = productsData[i].stock;

  document.getElementById("id").disabled = true;

  editIndex = i;
}

// CANCEL

function cancelEdit() {
  editIndex = -1;

  document.getElementById("id").disabled = false;

  ["id", "name", "category", "price", "stock"].forEach(
    (x) => (document.getElementById(x).value = ""),
  );
}

// DELETE

function deleteProduct(i) {
  deleteIndex = i;

  document.getElementById("confirmBox").style.display = "block";
}

function confirmDelete() {
  productsData.splice(deleteIndex, 1);

  msg.innerHTML = "Deleted Successfully (200)";
  msg.className = "success";

  displayProducts(productsData);
  closeModal();
}

function closeModal() {
  document.getElementById("confirmBox").style.display = "none";
}

// SEARCH

function searchProduct() {
  let cat = document.getElementById("search").value.toLowerCase();

  let filtered = productsData.filter((p) =>
    p.category.toLowerCase().includes(cat),
  );

  displayProducts(filtered);
}

// INIT
loadProducts();
