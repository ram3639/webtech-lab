// 1. Survey Configuration Structure
const surveyData = [
    {
        id: "q1",
        label: "Your Full Name",
        type: "text",
        required: true,
        minLength: 3
    },
    {
        id: "q2",
        label: "How did you hear about us?",
        type: "radio",
        options: ["Social Media", "Friend", "Advertisement", "Other"],
        required: true
    },
    {
        id: "q3",
        label: "Which features do you use? (Select at least 2)",
        type: "checkbox",
        options: ["Dashboard", "Reports", "API", "Mobile App"],
        minSelection: 2
    },
    {
        id: "q4",
        label: "Additional Comments (Max 100 characters)",
        type: "textarea",
        maxLength: 100
    }
];

const container = document.getElementById('surveyContainer');
const form = document.getElementById('dynamicSurvey');

// 2. Generate Form Fields Dynamically
function buildSurvey() {
    surveyData.forEach(q => {
        const wrapper = document.createElement('div');
        wrapper.className = 'question-block';
        wrapper.id = `wrapper-${q.id}`;

        const label = document.createElement('label');
        label.className = 'question-label';
        label.innerHTML = `${q.label} ${q.required || q.minSelection ? '<span style="color:red">*</span>' : ''}`;
        wrapper.appendChild(label);

        // Render based on type
        if (q.type === 'text' || q.type === 'textarea') {
            const input = q.type === 'text' ? document.createElement('input') : document.createElement('textarea');
            input.type = 'text';
            input.id = q.id;
            input.placeholder = "Enter your answer here...";
            wrapper.appendChild(input);
        } 
        else if (q.type === 'radio' || q.type === 'checkbox') {
            const group = document.createElement('div');
            group.className = 'option-group';
            q.options.forEach(opt => {
                const item = document.createElement('label');
                item.className = 'option-item';
                item.innerHTML = `
                    <input type="${q.type}" name="${q.id}" value="${opt}">
                    ${opt}
                `;
                group.appendChild(item);
            });
            wrapper.appendChild(group);
        }

        // Placeholder for error messages
        const error = document.createElement('span');
        error.id = `error-${q.id}`;
        error.className = 'error-msg hidden';
        wrapper.appendChild(error);

        container.appendChild(wrapper);
    });
}

// 3. Validation Logic
function validateSurvey() {
    let isFormValid = true;

    surveyData.forEach(q => {
        const errorEl = document.getElementById(`error-${q.id}`);
        const wrapper = document.getElementById(`wrapper-${q.id}`);
        let errorMessage = "";

        if (q.type === 'text' || q.type === 'textarea') {
            const val = document.getElementById(q.id).value.trim();
            if (q.required && !val) errorMessage = "This field is required.";
            else if (q.minLength && val.length < q.minLength) errorMessage = `Minimum ${q.minLength} characters required.`;
            else if (q.maxLength && val.length > q.maxLength) errorMessage = `Maximum ${q.maxLength} characters allowed.`;
        } 
        else if (q.type === 'radio') {
            const selected = document.querySelector(`input[name="${q.id}"]:checked`);
            if (q.required && !selected) errorMessage = "Please select an option.";
        }
        else if (q.type === 'checkbox') {
            const checkedCount = document.querySelectorAll(`input[name="${q.id}"]:checked`).length;
            if (q.minSelection && checkedCount < q.minSelection) {
                errorMessage = `Please select at least ${q.minSelection} options.`;
            }
        }

        // UI Update
        if (errorMessage) {
            errorEl.textContent = errorMessage;
            errorEl.classList.remove('hidden');
            wrapper.classList.add('invalid-input');
            isFormValid = false;
        } else {
            errorEl.classList.add('hidden');
            wrapper.classList.remove('invalid-input');
        }
    });

    return isFormValid;
}

// 4. Submission Handling
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const mainError = document.getElementById('mainError');
    
    if (validateSurvey()) {
        mainError.classList.add('hidden');
        alert("Survey Submitted Successfully!");
        console.log("Collecting data...", new FormData(form));
        form.reset();
    } else {
        mainError.classList.remove('hidden');
    }
});

// Run builder on load
buildSurvey();