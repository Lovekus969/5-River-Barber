// dashboard-events.js

function renderAppointments(sortOrder = "asc") {
  const appointments = getAppointments();
  const container = document.getElementById("appointments-container");
  container.innerHTML = "";

  const today = new Date().toISOString().split("T")[0];

  const sortedAppointments = appointments.sort((a, b) => {
    return sortOrder === "asc"
      ? new Date(a.time) - new Date(b.time)
      : new Date(b.time) - new Date(a.time);
  });

  sortedAppointments.forEach((appt, index) => {
    const apptDate = appt.time.split("T")[0];
    const apptDiv = document.createElement("div");
    apptDiv.className = "appointment";
    if (apptDate === today) apptDiv.classList.add("highlight");

    apptDiv.innerHTML = `
      <p><strong>Name:</strong> ${appt.name}</p>
      <p><strong>Phone:</strong> ${appt.phone}</p>
      <p><strong>Email:</strong> ${appt.email}</p>
      <p><strong>Time:</strong> ${appt.time}</p>
      <p><strong>Note:</strong> ${appt.note}</p>
      <p><strong>Location:</strong> ${appt.location}</p>
      <p><strong>Barber:</strong> ${appt.barber}</p>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;

    container.appendChild(apptDiv);
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      const appointments = getAppointments();
      if (deleteAppointment(index, appointments)) renderAppointments(sortOrder);
    });
  });
}

document.getElementById("sort").addEventListener("change", function () {
  renderAppointments(this.value);
});

document.getElementById("export").addEventListener("click", function () {
  exportToCSV(getAppointments());
});

// Password protection
(function checkPassword() {
  const correctPassword = "@1313";
  const userInput = prompt("Please enter the password to access this page:");
  if (userInput !== correctPassword) {
    alert("Incorrect password. Access denied.");
    window.location.href = "index.html"; // redirect to another page
  }
})();

window.onload = function () {
  renderAppointments();
};
