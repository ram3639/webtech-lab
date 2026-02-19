let studentsData = [];
let table = document.getElementById("stuTable");
let msg = document.getElementById("msg");

let editIndex = -1;
let deleteIndex = -1;

// LOAD JSON USING FETCH

function loadStudents() {
  fetch("students.json")
    .then((res) => res.json())
    .then((data) => {
      studentsData = data.students;
      displayStudents();
    })
    .catch(() => {
      msg.innerHTML = "JSON Parsing Error (500)";
      msg.className = "error";
    });
}

// DISPLAY

function displayStudents() {
  table.innerHTML = "";

  studentsData.forEach((s, i) => {
    table.innerHTML += `<tr>
<td>${s.id}</td>
<td>${s.name}</td>
<td>${s.course}</td>
<td>${s.marks}</td>
<td>
<button onclick="editStudent(${i})">Edit</button>
<button onclick="deleteStudent(${i})">Delete</button>
</td>
</tr>`;
  });
}

// ADD / UPDATE

function addStudent() {
  let id = document.getElementById("id");
  let name = document.getElementById("name");
  let course = document.getElementById("course");
  let marks = document.getElementById("marks");

  // VALIDATION

  if (
    id.value == "" ||
    name.value == "" ||
    course.value == "" ||
    marks.value == ""
  ) {
    msg.innerHTML = "Fill All Fields (404)";
    msg.className = "error";
    return;
  }

  // UPDATE

  if (editIndex != -1) {
    studentsData[editIndex].name = name.value;
    studentsData[editIndex].course = course.value;
    studentsData[editIndex].marks = marks.value;

    msg.innerHTML = "Updated Successfully (200)";
    msg.className = "success";

    cancelEdit();
    displayStudents();
    return;
  }

  // DUPLICATE CHECK

  let exists = studentsData.find((s) => s.id == id.value);

  if (exists) {
    msg.innerHTML = "Error 404: ID Exists";
    msg.className = "error";
    return;
  }

  // CREATE

  studentsData.push({
    id: id.value,
    name: name.value,
    course: course.value,
    marks: marks.value,
  });

  msg.innerHTML = "Added Successfully (200)";
  msg.className = "success";

  displayStudents();
  cancelEdit();
}

// EDIT

function editStudent(i) {
  document.getElementById("id").value = studentsData[i].id;

  document.getElementById("name").value = studentsData[i].name;

  document.getElementById("course").value = studentsData[i].course;

  document.getElementById("marks").value = studentsData[i].marks;

  document.getElementById("id").disabled = true;

  editIndex = i;
}

// CANCEL

function cancelEdit() {
  editIndex = -1;

  document.getElementById("id").disabled = false;

  document.getElementById("id").value = "";
  document.getElementById("name").value = "";
  document.getElementById("course").value = "";
  document.getElementById("marks").value = "";
}

// DELETE

function deleteStudent(i) {
  deleteIndex = i;

  document.getElementById("confirmBox").style.display = "block";
}

function confirmDelete() {
  studentsData.splice(deleteIndex, 1);

  msg.innerHTML = "Deleted Successfully (200)";
  msg.className = "success";

  displayStudents();
  closeModal();
}

function closeModal() {
  document.getElementById("confirmBox").style.display = "none";
}

// INIT
loadStudents();
