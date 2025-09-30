document.getElementById('contactForm').addEventListener('submit', function(event) {
    // 1. Prevent form submission initially (Requirement 5)
    event.preventDefault();

    // 2. Clear previous error/success messages
    clearMessages();

    // 3. Perform validation
    const isValid = validateForm();

    // 4. Handle submission
    if (isValid) {
        // Since actual sending is not required (Requirement 6),
        // we simulate success.
        showSuccess();
    }
});

/**
 * Validates all form inputs.
 * @returns {boolean} True if all fields are valid, false otherwise.
 */
function validateForm() {
    let isValid = true;

    // Get input values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // --- Validation Checks (Requirement 3: non-empty, valid email) ---

    // 1. Name validation (non-empty)
    if (name === '') {
        displayError('nameError', 'Name is required.');
        isValid = false;
    } 
    // Edge case: special characters (Optional check)
    // else if (/[^a-zA-Z\s]/.test(name)) {
    //     displayError('nameError', 'Name should only contain letters and spaces.');
    //     isValid = false;
    // }

    // 2. Email validation (non-empty and valid format)
    if (email === '') {
        displayError('emailError', 'Email is required.');
        isValid = false;
    } else if (!isValidEmail(email)) { // Requirement 3 & 8 (Regex)
        displayError('emailError', 'Please enter a valid email address (e.g., user@domain.com).');
        isValid = false;
    }

    // 3. Message validation (non-empty)
    if (message === '') {
        displayError('messageError', 'Message is required.');
        isValid = false;
    } 

    return isValid;
}

/**
 * Uses regex to check if an email is valid (Requirement 8).
 * A simple but effective regex for basic email format validation.
 * @param {string} email The email string to test.
 * @returns {boolean} True if the email matches the regex pattern.
 */
function isValidEmail(email) {
    // Regex for basic email format: user@domain.tld
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email);
}

/**
 * Displays an error message below the input (Requirement 4).
 * @param {string} elementId The ID of the span element to display the message in.
 * @param {string} message The error message text.
 */
function displayError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

/**
 * Clears all previous error and success messages.
 */
function clearMessages() {
    // Clear error messages
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('messageError').textContent = '';
    
    // Hide success message
    const successMsg = document.getElementById('successMessage');
    successMsg.textContent = '';
    successMsg.classList.add('hidden');
}

/**
 * Shows the success message and resets the form (Requirement 6).
 */
function showSuccess() {
    const name = document.getElementById('name').value.trim();
    const successMsg = document.getElementById('successMessage');

    successMsg.textContent = `Thank you, ${name}! Your message has been received (simulated).`;
    successMsg.classList.remove('hidden');
    
    // Reset the form fields
    document.getElementById('contactForm').reset();
}