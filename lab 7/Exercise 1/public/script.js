const api = "/notes";

function addNote() {
  const titleInput = document.getElementById("title");
  const subjectInput = document.getElementById("subject");
  const descriptionInput = document.getElementById("description");

  const data = {
    title: titleInput.value,
    subject: subjectInput.value,
    description: descriptionInput.value,
  };

  fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(() => {
      loadNotes();

      titleInput.value = "";
      subjectInput.value = "";
      descriptionInput.value = "";
    });
}

function loadNotes() {
  fetch(api)
    .then((res) => res.json())

    .then((data) => {
      let html = "";

      data.forEach((note) => {
        html += `

<div class="note-card" id="note-${note._id}">

<h3>${note.title}</h3>
<p class="note-subject">${note.subject}</p>
<p class="note-desc">${note.description}</p>

<div class="note-actions">

<button class="edit-btn" onclick="showEdit('${note._id}','${note.title}','${note.description}')">Edit</button>

<button class="delete-btn" onclick="deleteNote('${note._id}')">Delete</button>

</div>

</div>

`;
      });

      document.getElementById("notes").innerHTML = html;
    });
}

function deleteNote(id) {
  fetch(api + "/" + id, {
    method: "DELETE",
  }).then(() => loadNotes());
}

function showEdit(id, title, description) {
  const noteDiv = document.getElementById("note-" + id);

  noteDiv.innerHTML = `

<input class="edit-input" id="edit-title-${id}" value="${title}">

<textarea class="edit-textarea" id="edit-desc-${id}">${description}</textarea>

<div class="note-actions">

<button class="save-btn" onclick="updateNote('${id}')">Save</button>

<button class="cancel-btn" onclick="loadNotes()">Cancel</button>

</div>

`;
}

function updateNote(id) {
  const newTitle = document.getElementById("edit-title-" + id).value;

  const newDesc = document.getElementById("edit-desc-" + id).value;

  fetch(api + "/" + id, {
    method: "PUT",

    headers: { "Content-Type": "application/json" },

    body: JSON.stringify({
      title: newTitle,
      description: newDesc,
    }),
  }).then(() => loadNotes());
}

loadNotes();
