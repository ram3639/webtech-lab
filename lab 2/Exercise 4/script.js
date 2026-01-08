const registrationForm = document.getElementById('registrationForm');
const userTableBody = document.getElementById('userTableBody');

let users = JSON.parse(localStorage.getItem('userDB')) || [];
renderTable();

function showAlert(title, message) {
    document.getElementById('alertTitle').innerText = title;
    document.getElementById('alertMessage').innerText = message;
    document.getElementById('customAlert').style.display = 'flex';
}

function closeAlert() {
    document.getElementById('customAlert').style.display = 'none';
}

registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const mobile = document.getElementById('userMobile').value.trim();
    const password = document.getElementById('userPassword').value.trim();

    // 1. Gmail Validation
    if (!email.toLowerCase().endsWith('@gmail.com')) {
        showAlert("Access Denied", "System only accepts @gmail.com email addresses.");
        return;
    }

    // 2. Mobile Validation (Numbers only and exactly 10)
    const isNumeric = /^\d+$/.test(mobile);
    if (!isNumeric || mobile.length !== 10) {
        showAlert("Invalid Entry", "The mobile number must contain exactly 10 numeric digits.");
        return;
    }

    // 3. Password Validation
    if (password.length < 6) {
        showAlert("Security Alert", "Password is too short. It must be at least 6 characters.");
        return;
    }

    // 4. Duplicate Check
    if (users.some(u => u.email === email)) {
        showAlert("Duplicate Account", "This email address is already in our database.");
        return;
    }

    const newUser = { id: Date.now(), name, email, mobile };
    users.push(newUser);
    localStorage.setItem('userDB', JSON.stringify(users));
    
    renderTable();
    registrationForm.reset();
    showAlert("Confirmed", "User has been registered successfully.");
});

function renderTable() {
    userTableBody.innerHTML = '';
    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.mobile}</td>
            <td><button class="btn-delete" onclick="deleteUser(${user.id})">Delete</button></td>
        `;
        userTableBody.appendChild(tr);
    });
}

function deleteUser(id) {
    users = users.filter(u => u.id !== id);
    localStorage.setItem('userDB', JSON.stringify(users));
    renderTable();
}

document.getElementById('clearAllBtn').addEventListener('click', () => {
    if (users.length === 0) return;
    users = [];
    localStorage.removeItem('userDB');
    renderTable();
    showAlert("Database Reset", "All registered users have been deleted.");
});