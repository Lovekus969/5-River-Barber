document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#appointment-form");
  const thankYouMsg = document.querySelector("#thank-you-msg");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.querySelector("#customer-name").value;
      const email = document.querySelector("#email").value;

      console.log("Form submitted by:", name, email);

      thankYouMsg.textContent = `Thank you ${name}! Your appointment has been booked.`;
      thankYouMsg.style.display = "block";

      form.reset();

      setTimeout(() => {
        thankYouMsg.style.display = "none";
      }, 5000);
    });
  }
});
