const formData = {};
let currentStage = 1;

const stages = document.querySelectorAll('.form-stage');
const progressBar = document.getElementById('progressBar');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

nextBtn.addEventListener('click', () => {
    if (validateStage(currentStage)) {
        saveData(currentStage);
        if (currentStage < 4) {
            currentStage++;
            updateUI();
        } else {
            alert("Form Submitted Successfully!");
            console.log("Final Data:", formData);
            resetWorkflow(); 
        }
    }
});

function resetWorkflow() {
    for (let key in formData) {
        delete formData[key];
    }
    currentStage = 1;
    document.getElementById('workflowForm').reset();
    clearErrors();
    updateUI();
}



prevBtn.addEventListener('click', () => {
    if (currentStage > 1) {
        currentStage--;
        updateUI();
    }
});

// 2. Validation Engine
function validateStage(stage) {
    let isValid = true;
    clearErrors();

    if (stage === 1) {
        const user = document.getElementById('username').value.trim();
        if (user.length < 4) {
            showError('username', 'Username must be at least 4 characters.');
            isValid = false;
        }
    } 
    else if (stage === 2) {
        const name = document.getElementById('fullname').value.trim();
        if (name.split(' ').length < 2) {
            showError('fullname', 'Please enter your full name (First & Last).');
            isValid = false;
        }
    }
    else if (stage === 3) {
        const comp = document.getElementById('company').value.trim();
        if (!comp) {
            showError('company', 'Company name is required.');
            isValid = false;
        }
    }
    else if (stage === 4) {
        const terms = document.getElementById('terms').checked;
        if (!terms) {
            showError('terms', 'You must agree to the terms.');
            isValid = false;
        }
    }

    return isValid;
}

// 3. Data Management
function saveData(stage) {
    if (stage === 1) formData.username = document.getElementById('username').value;
    if (stage === 2) formData.fullname = document.getElementById('fullname').value;
    if (stage === 3) formData.company = document.getElementById('company').value;
    
    if (currentStage === 3) prepareReview();
}

function prepareReview() {
    const reviewBox = document.getElementById('reviewData');
    reviewBox.innerHTML = `
        <p><strong>Username:</strong> ${formData.username}</p>
        <p><strong>Name:</strong> ${formData.fullname}</p>
        <p><strong>Company:</strong> ${formData.company}</p>
    `;
}

// 4. UI Rendering
function updateUI() {
    // Toggle stages
    stages.forEach(s => s.classList.remove('active'));
    document.querySelector(`[data-stage="${currentStage}"]`).classList.add('active');

    // Update Progress Bar
    progressBar.style.width = `${(currentStage / 4) * 100}%`;

    // Button states
    prevBtn.disabled = currentStage === 1;
    nextBtn.innerText = currentStage === 4 ? "Submit" : "Next";
}

function showError(id, msg) {
    document.getElementById(`err-${id}`).innerText = msg;
    document.getElementById(id).style.borderColor = "#e74c3c";
}

function clearErrors() {
    document.querySelectorAll('.error').forEach(e => e.innerText = "");
    document.querySelectorAll('input').forEach(i => i.style.borderColor = "#ddd");
}