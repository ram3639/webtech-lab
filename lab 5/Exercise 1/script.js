let xmlDoc;
let table = document.getElementById("empTable");
let msg = document.getElementById("msg");

let editIndex = -1;
let deleteIndex = -1;

// LOAD XML

function loadXML() {
  let xhr = new XMLHttpRequest();

  xhr.open("GET", "employees.xml", true);

  xhr.onload = function () {
    if (xhr.status == 200) {
      xmlDoc = xhr.responseXML;

      if (!xmlDoc) {
        msg.innerHTML = "Malformed XML (500)";
        msg.className = "error";
        return;
      }

      displayEmployees();
    }
  };

  xhr.send();
}

// DISPLAY

function displayEmployees() {
  table.innerHTML = "";

  let emp = xmlDoc.getElementsByTagName("employee");

  for (let i = 0; i < emp.length; i++) {
    table.innerHTML += `<tr>
<td>${emp[i].getElementsByTagName("id")[0].textContent}</td>
<td>${emp[i].getElementsByTagName("name")[0].textContent}</td>
<td>${emp[i].getElementsByTagName("department")[0].textContent}</td>
<td>${emp[i].getElementsByTagName("salary")[0].textContent}</td>

<td>
<button onclick="editEmp(${i})">Edit</button>
<button onclick="deleteEmp(${i})">Delete</button>
</td>
</tr>`;
  }
}

// ADD / UPDATE

function addEmployee() {
  let id = document.getElementById("id");
  let name = document.getElementById("name");
  let dept = document.getElementById("dept");
  let salary = document.getElementById("salary");

  let emp = xmlDoc.getElementsByTagName("employee");

  // UPDATE
  if (editIndex != -1) {
    emp[editIndex].getElementsByTagName("name")[0].textContent = name.value;

    emp[editIndex].getElementsByTagName("department")[0].textContent =
      dept.value;

    emp[editIndex].getElementsByTagName("salary")[0].textContent = salary.value;

    msg.innerHTML = "Updated Successfully (200)";
    msg.className = "success";

    cancelEdit();
    displayEmployees();
    return;
  }

  // DUPLICATE ID CHECK → 404

  for (let i = 0; i < emp.length; i++) {
    if (emp[i].getElementsByTagName("id")[0].textContent == id.value) {
      msg.innerHTML = "Error 404: ID Exists";
      msg.className = "error";
      return;
    }
  }

  // CREATE

  let newEmp = xmlDoc.createElement("employee");

  ["id", "name", "department", "salary"].forEach((tag) => {
    let node = xmlDoc.createElement(tag);

    let val = document.getElementById(tag == "department" ? "dept" : tag).value;

    node.appendChild(xmlDoc.createTextNode(val));
    newEmp.appendChild(node);
  });

  xmlDoc.getElementsByTagName("employees")[0].appendChild(newEmp);

  msg.innerHTML = "Added Successfully (200)";
  msg.className = "success";

  displayEmployees();
  cancelEdit();
}

// EDIT

function editEmp(i) {
  let emp = xmlDoc.getElementsByTagName("employee");

  document.getElementById("id").value =
    emp[i].getElementsByTagName("id")[0].textContent;

  document.getElementById("name").value =
    emp[i].getElementsByTagName("name")[0].textContent;

  document.getElementById("dept").value =
    emp[i].getElementsByTagName("department")[0].textContent;

  document.getElementById("salary").value =
    emp[i].getElementsByTagName("salary")[0].textContent;

  document.getElementById("id").disabled = true;

  editIndex = i;
}

// CANCEL

function cancelEdit() {
  editIndex = -1;

  document.getElementById("id").disabled = false;

  document.getElementById("id").value = "";
  document.getElementById("name").value = "";
  document.getElementById("dept").value = "";
  document.getElementById("salary").value = "";
}

// DELETE

function deleteEmp(i) {
  deleteIndex = i;

  document.getElementById("confirmBox").style.display = "block";
}

function confirmDelete() {
  let emp = xmlDoc.getElementsByTagName("employee")[deleteIndex];

  emp.parentNode.removeChild(emp);

  msg.innerHTML = "Deleted Successfully (200)";
  msg.className = "success";

  displayEmployees();
  closeModal();
}

function closeModal() {
  document.getElementById("confirmBox").style.display = "none";
}

// INIT
loadXML();
