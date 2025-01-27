// Show/hide the "Other Barber" input based on selection
document.getElementById('barber').addEventListener('change', function() {
    const barberSelect = document.getElementById('barber');
    const otherBarberInput = document.getElementById('otherBarber');

    if (barberSelect.value === 'other') {
        otherBarberInput.style.display = 'block';
    } else {
        otherBarberInput.style.display = 'none';
    }
});

// Handle form submission and display confirmation message
document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the form values
    const name = document.getElementById('name').value;
    const barber = document.getElementById('barber').value;
    const otherName = document.getElementById('otherName').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const service = document.getElementById('service').value;

    // Determine which barber was selected
    let barberName = barber;
    if (barber === 'other') {
        barberName = otherName || 'No barber specified';
    }

    // Show confirmation message
    const confirmationMessage = `
        <p>Thank you, ${name}! Your appointment for a ${service} with ${barberName} on ${date} at ${time} has been booked.</p>
    `;
    document.getElementById('confirmationMessage').innerHTML = confirmationMessage;

    // Optionally, clear the form after submission
    document.getElementById('appointmentForm').reset();
    document.getElementById('otherBarber').style.display = 'none';  // Hide 'other' field after submission
});

// Add dynamic content or interactivity
document.addEventListener("DOMContentLoaded", function () {
    const greeting = document.querySelector(".header p");
    greeting.textContent = "Experience the Best Haircuts in Town!";
});

// Form validation example
const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    // Ensure required fields are filled
    if (!name || !email) {
        e.preventDefault();
        alert("Please fill in all required fields.");
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});
