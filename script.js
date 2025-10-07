
document.addEventListener('DOMContentLoaded', function() {

    // Home Section Animations with Intersection Observer
    const homeSection = document.getElementById('home');
    if (homeSection) {
        const homeElements = homeSection.querySelectorAll('p, h1, h2, .d-flex');
        
        const homeObserverOptions = {
            threshold: 0.1,
            rootMargin: '0px'
        };

        const homeObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animation classes when home section is visible
                    if (homeElements.length >= 4) {
                        homeElements[0].classList.add('fade-in-up'); // "Hi, I'm"
                        homeElements[1].classList.add('fade-in-up-delay-1'); // Name
                        homeElements[2].classList.add('fade-in-up-delay-2'); // "I'm a passionate developer"
                        homeElements[3].classList.add('fade-in-up-delay-3'); // Description
                        if (homeElements[4]) {
                            homeElements[4].classList.add('scale-in'); // Buttons
                        }
                    }
                } else {
                    // Remove animation classes when home section is not visible
                    homeElements.forEach(el => {
                        el.classList.remove('fade-in-up', 'fade-in-up-delay-1', 'fade-in-up-delay-2', 'fade-in-up-delay-3', 'scale-in');
                    });
                }
            });
        }, homeObserverOptions);

        homeObserver.observe(homeSection);
    }

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    // Add scroll-reveal class to cards and observe them
    const cards = document.querySelectorAll('.card-project, .card-qualification');
    cards.forEach(card => {
        card.classList.add('scroll-reveal');
        observer.observe(card);
    });

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