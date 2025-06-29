document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('multiStepForm');
    const formSteps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const submitButton = document.querySelector('.submit-btn');
    const successMessage = document.getElementById('successMessage');
    const summaryDiv = document.getElementById('summary');

    let currentStep = 0;

    // Function to show a specific step
    function showStep(stepIndex) {
        formSteps.forEach((step, index) => {
            if (index === stepIndex) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    // Function to update the summary before the final step
    function updateSummary() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const preference = document.getElementById('preference').value;
        const comments = document.getElementById('comments').value;

        summaryDiv.innerHTML = `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Favorite Color:</strong> ${preference || 'Not specified'}</p>
            <p><strong>Comments:</strong> ${comments || 'No comments'}</p>
        `;
    }

    // Event listeners for "Next" buttons
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Basic validation for the current step
            const currentActiveStep = formSteps[currentStep];
            const inputsInCurrentStep = currentActiveStep.querySelectorAll('input[required], select[required], textarea[required]');
            let allInputsValid = true;

            inputsInCurrentStep.forEach(input => {
                if (!input.value.trim()) { // Check for empty or just whitespace
                    input.style.borderColor = 'red'; // Simple visual feedback
                    allInputsValid = false;
                } else {
                    input.style.borderColor = '#ddd'; // Reset to default
                }
            });

            if (allInputsValid) {
                currentStep++;
                if (currentStep === formSteps.length - 1) { // If it's the confirmation step
                    updateSummary();
                }
                showStep(currentStep);
            } else {
                alert('Please fill in all required fields.');
            }
        });
    });

    // Event listeners for "Previous" buttons
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentStep--;
            showStep(currentStep);
        });
    });

    // Event listener for form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // In a real application, you would send this data to a server
        const formData = new FormData(form);
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }

        console.log('Form Submitted!', data); // Log data to console for now

        // Simulate a successful submission
        formSteps[currentStep].classList.remove('active'); // Hide current step
        successMessage.style.display = 'block'; // Show success message

        // Optionally, you might redirect the user or clear the form here
        // setTimeout(() => form.reset(), 3000); // Reset form after 3 seconds
    });

    // Initialize by showing the first step
    showStep(currentStep);
});
