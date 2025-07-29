// dashboard-utils.js

function getAppointments() {
  return JSON.parse(localStorage.getItem("appointments")) || [];
}

function saveAppointments(appointments) {
  localStorage.setItem("appointments", JSON.stringify(appointments));
}

function deleteAppointment(index, appointments) {
  if (confirm("Are you sure you want to delete this appointment?")) {
    appointments.splice(index, 1);
    saveAppointments(appointments);
    return true;
  }
  return false;
}

function exportToCSV(appointments) {
  let csvContent = "Name,Phone,Email,Time,Note,Location,Barber\n";
  appointments.forEach(appt => {
    const row = [appt.name, appt.phone, appt.email, appt.time, appt.note, appt.location, appt.barber].map(item => `"${item}"`).join(",");
    csvContent += row + "\n";
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "appointments.csv";
  downloadLink.click();
}
