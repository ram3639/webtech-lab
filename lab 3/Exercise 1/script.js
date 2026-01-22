document.addEventListener('DOMContentLoaded', () => {
    // 1. Element Selection
    const form = document.getElementById('registrationForm');
    const roleSelect = document.getElementById('role');
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const ageInput = document.getElementById('age');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const skillsInput = document.getElementById('skills');
    const skillsSection = document.getElementById('skillsSection');
    const submitBtn = document.getElementById('submitBtn');
    const passwordStrengthBar = document.getElementById('passwordStrength');

    // State object to track validity of each field
    const validityState = {
        role: false,
        fullname: false,
        email: false,
        age: false,
        password: false,
        confirmPassword: false,
        skills: true // Default true (will update if role requires it)
    };

    // 2. Event Listeners
    // Trigger validation on 'input' for real-time feedback
    roleSelect.addEventListener('change', handleRoleChange);
    fullnameInput.addEventListener('input', () => validateField(fullnameInput, validateName));
    emailInput.addEventListener('input', () => validateField(emailInput, validateEmail));
    ageInput.addEventListener('input', () => validateField(ageInput, validateAge));
    passwordInput.addEventListener('input', () => {
        validateField(passwordInput, validatePassword);
        // Re-validate confirm password whenever password changes
        if(confirmPasswordInput.value) validateField(confirmPasswordInput, validateConfirmPassword);
    });
    confirmPasswordInput.addEventListener('input', () => validateField(confirmPasswordInput, validateConfirmPassword));
    skillsInput.addEventListener('input', () => validateField(skillsInput, validateSkills));

    // 3. Dynamic Role Logic
    function handleRoleChange() {
        const role = roleSelect.value;
        validityState.role = role !== "";
        
        // Clear error on role select
        validateField(roleSelect, () => role !== "" ? "" : "Please select a role.");
        
        // DOM Manipulation: Show skills for Student/Teacher, hide for Admin
        if (role === 'teacher' || role === 'student') {
            skillsSection.classList.remove('hidden');
            validityState.skills = false; // Reset to false because it is now required
            validateField(skillsInput, validateSkills);
        } else {
            skillsSection.classList.add('hidden');
            validityState.skills = true; // Not required for Admin
        }

        // Re-run validations that depend on Role (Email & Password)
        if(emailInput.value) validateField(emailInput, validateEmail);
        if(passwordInput.value) validateField(passwordInput, validatePassword);
        
        checkFormValidity();
    }

    // 4. General Field Validation Wrapper
    function validateField(inputElement, validationFunction) {
        const errorMsgId = inputElement.id + 'Error';
        const errorElement = document.getElementById(errorMsgId);
        const errorMessage = validationFunction(inputElement.value);

        if (errorMessage) {
            setError(inputElement, errorElement, errorMessage);
            validityState[inputElement.id] = false;
        } else {
            setSuccess(inputElement, errorElement);
            validityState[inputElement.id] = true;
        }
        checkFormValidity();
    }

    // 5. Specific Validation Rules
    function validateName(value) {
        if (value.trim().length < 3) return "Name must be at least 3 characters.";
        return "";
    }

    function validateEmail(value) {
        const role = roleSelect.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(value)) return "Invalid email format.";
        
        // Dynamic Rule: Admins must use specific domain
        if (role === 'admin' && !value.endsWith('@admin.com')) {
            return "Admins must use an @admin.com email.";
        }
        return "";
    }

    function validateAge(value) {
        const role = roleSelect.value;
        if (!value) return "Age is required.";
        
        // Dynamic Rule: Teachers must be older
        if(role === 'admin' && value < 24) return "Admin must be atleast 24 years old"
        if (role === 'teacher' && value < 21) return "Teachers must be at least 21 years old.";
        if (value < 1 || value > 120) return "Invalid age.";
        return "";
    }

    function validatePassword(value) {
        const role = roleSelect.value;
        updatePasswordStrength(value);

        if (value.length < 6) return "Password must be at least 6 characters.";
        
        // Dynamic Rule: Admins need strong passwords
        if (role === 'admin') {
            const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!strongRegex.test(value)) {
                return "Admin: 8+ chars, 1 Uppercase, 1 Number, 1 Special Char.";
            }
        }
        return "";
    }

    function validateConfirmPassword(value) {
        if (value !== passwordInput.value) return "Passwords do not match.";
        return "";
    }

    function validateSkills(value) {
        const role = roleSelect.value;
        // Only validate if role is Student or Teacher
        if ((role === 'student' || role === 'teacher') && value.trim().length === 0) {
            return "Please list at least one skill.";
        }
        return "";
    }

    // 6. UI Helpers
    function setError(input, errorElement, message) {
        input.classList.add('invalid');
        input.classList.remove('valid');
        if(errorElement){
        errorElement.textContent = message;
        }
        else{
            console.warn(`Missing error element for : ${input.id}`);
        }
    }

    function setSuccess(input, errorElement) {
        input.classList.add('valid');
        input.classList.remove('invalid');
        if(errorElement){
        errorElement.textContent = "";
        }
    }

    function updatePasswordStrength(password) {
        let strength = 0;
        if (password.length >= 6) strength++;
        if (password.length >= 10) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        const width = (strength / 5) * 100;
        passwordStrengthBar.style.width = width + '%';

        // Color coding
        if (strength <= 2) passwordStrengthBar.style.backgroundColor = '#e74c3c'; // Red
        else if (strength <= 3) passwordStrengthBar.style.backgroundColor = '#f1c40f'; // Yellow
        else passwordStrengthBar.style.backgroundColor = '#2ecc71'; // Green
    }

    function checkFormValidity() {
        // Only enable button if ALL fields in validityState are true
        const allValid = Object.values(validityState).every(status => status === true);
        submitBtn.disabled = !allValid;
    }

    // 7. Submission Handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Registration Successful!');
        form.reset();
        // Reset visual styles
        document.querySelectorAll('input, select').forEach(el => el.classList.remove('valid', 'invalid'));
        passwordStrengthBar.style.width = '0%';
        skillsSection.classList.add('hidden');
        submitBtn.disabled = true;
    });
});
