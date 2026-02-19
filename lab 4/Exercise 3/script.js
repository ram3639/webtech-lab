let form = document.getElementById("studentForm");
let table = document.getElementById("studentTable");
let msg = document.getElementById("msg");

let editIndex = -1;
let deleteIndex = -1;

// ======================
// LOAD INITIAL JSON DATA
// ======================

function fetchStudents() {
  fetch("students.json")
    .then((res) => {
      if (res.status === 200) return res.json();
      else if (res.status === 404) throw new Error("404 Not Found");
      else throw new Error("500 Server Error");
    })
    .then((data) => {
      // Load JSON only if LocalStorage empty
      if (!localStorage.getItem("students")) {
        localStorage.setItem("students", JSON.stringify(data.students));
      }

      displayStudents();
    })
    .catch((error) => {
      msg.innerHTML = error.message;
      msg.className = "error";
    });
}

// ======================
// DISPLAY TABLE
// ======================

function displayStudents() {
  let students = JSON.parse(localStorage.getItem("students")) || [];

  table.innerHTML = "";

  students.forEach((s, index) => {
    table.innerHTML += `<tr>
<td>${s.id}</td>
<td>${s.name}</td>
<td>${s.dept}</td>
<td>${s.marks}</td>

<td>
<button onclick="editStudent(${index})">Edit</button>
<button onclick="deleteStudent(${index})">Delete</button>
</td>

</tr>`;
  });
}

// ======================
// CREATE / UPDATE
// ======================
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let id = document.getElementById("id");
  let name = document.getElementById("name").value;
  let dept = document.getElementById("dept").value;
  let marks = document.getElementById("marks").value;

  let students = JSON.parse(localStorage.getItem("students")) || [];

  // ======================
  // UPDATE MODE
  // ======================

  if (editIndex !== -1) {
    students[editIndex] = {
      id: id.value,
      name,
      dept,
      marks,
    };

    msg.innerHTML = "Updated Successfully (200)";
    msg.className = "success";

    editIndex = -1;
    id.disabled = false;
  }

  // ======================
  // CREATE MODE
  // ======================
  else {
    // CHECK DUPLICATE ID
    let exists = students.find((s) => s.id == id.value);

    if (exists) {
      msg.innerHTML = "Error 404: Student ID already exists!";
      msg.className = "error";
      return;
    }

    students.push({
      id: id.value,
      name,
      dept,
      marks,
    });

    msg.innerHTML = "Added Successfully (200)";
    msg.className = "success";
  }

  localStorage.setItem("students", JSON.stringify(students));

  displayStudents();
  form.reset();
});

// ======================
// EDIT
// ======================

function editStudent(index) {
  let students = JSON.parse(localStorage.getItem("students"));

  document.getElementById("id").value = students[index].id;

  document.getElementById("name").value = students[index].name;

  document.getElementById("dept").value = students[index].dept;

  document.getElementById("marks").value = students[index].marks;

  // prevent ID editing
  document.getElementById("id").disabled = true;

  editIndex = index;
}

// ======================
// DELETE (MODAL)
// ======================

function deleteStudent(index) {
  deleteIndex = index;

  document.getElementById("confirmBox").style.display = "block";
}

// YES BUTTON

document.getElementById("yesBtn").onclick = function () {
  let students = JSON.parse(localStorage.getItem("students"));

  students.splice(deleteIndex, 1);

  localStorage.setItem("students", JSON.stringify(students));

  msg.innerHTML = "Deleted Successfully (200)";
  msg.className = "success";

  displayStudents();

  document.getElementById("confirmBox").style.display = "none";
};

// NO BUTTON

document.getElementById("noBtn").onclick = function () {
  document.getElementById("confirmBox").style.display = "none";
};

// ======================
// INIT
// ======================

fetchStudents();
