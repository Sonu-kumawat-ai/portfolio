
document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('contact-form');
    const statusMessage = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault();

            if (!form.checkValidity()) {
                event.stopPropagation();
                form.classList.add('was-validated');
                return; // Stop the function if the form is invalid
            }

            // If the form is valid, proceed with sending the data
            const data = new FormData(event.target);

            fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    statusMessage.innerHTML = "Thanks for your submission!";
                    statusMessage.style.color = "#42b883"; // A success green color
                    form.reset(); // Clear the form fields
                    form.classList.remove('was-validated'); // Reset validation state
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            statusMessage.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            statusMessage.innerHTML = "Oops! There was a problem submitting your form";
                        }
                        statusMessage.style.color = "#dc3545"; // An error red color
                    })
                }
            }).catch(error => {
                statusMessage.innerHTML = "Oops! There was a problem submitting your form";
                statusMessage.style.color = "#dc3545"; // An error red color
            });
        });
    }
});