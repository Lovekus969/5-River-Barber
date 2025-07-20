document.addEventListener("DOMContentLoaded", () => {
  // Header Greeting
  const greeting = document.querySelector(".header p");
  if (greeting) greeting.textContent = "Experience the Best Haircuts in Town!";

  // Highlight today's hours
  const dayIndex = new Date().getDay();
  const listItems = document.querySelectorAll(".shop-hours li");
  const customOrder = [6, 0, 1, 2, 3, 4, 5];
  if (listItems.length > 0) {
    listItems[customOrder.indexOf(dayIndex)].style.color = "#00cc66";
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });




  function handleFormSubmission(event) {
  const name = document.getElementById("customer-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const notes = document.getElementById("notes").value.trim();
  const location = document.querySelector("select[name='location']").value;
  const barber = document.getElementById("barber-select").value;
  const date = document.getElementById("appointment-date").value;
  const time = document.getElementById("appointment-time").value;

  const isConflict = bookedSlots.some(
    slot => slot.location === location && slot.date === date && slot.time === time
  );

  if (isConflict) {
    alert("⚠️ This time slot is already booked for the selected location. Please pick a different time.");
    return;
  }

  bookedSlots.push({ location, date, time });
  playCheerfulTone();

  setTimeout(() => {
    const msg = document.getElementById("thank-you-msg");
    msg.textContent = `🎉 Thanks ${name}! Your appointment with ${barber} at ${location} on ${date} at ${time} is confirmed.`;
    msg.style.display = "block";
    thankUserByName(name);
    document.getElementById("appointment-form").reset();
  }, 2000);
}


  // GSAP Gallery Scroll Animation (if GSAP is loaded)
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".gallery-img").forEach((img, index) => {
      const directions = ["left", "right", "top"];
      const direction = directions[index % directions.length];
      gsap.from(img, {
        scrollTrigger: {
          trigger: img,
          start: "top 90%",
          toggleActions: "play none none reset",
        },
        x: direction === "left" ? -200 : direction === "right" ? 200 : 0,
        y: direction === "top" ? -200 : 0,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });
    });
  }

  // Initialize gallery toggle button
  setupGalleryToggle();

  // Footer color animation button
  const magicBtn = document.getElementById("magic-btn");
  if (magicBtn) {
    magicBtn.addEventListener("click", animateFooterColor);
    magicBtn.addEventListener("mouseover", () => {
      const hoverMsg = document.getElementById("hover-message");
      if (hoverMsg) {
        hoverMsg.innerText = "🎨 Color Magic Loading...";
        hoverMsg.classList.add("visible");
      }
    });
    magicBtn.addEventListener("mouseout", () => {
      const hoverMsg = document.getElementById("hover-message");
      if (hoverMsg) hoverMsg.classList.remove("visible");
    });
  }

  // Tilt animation on service buttons
  document.querySelectorAll('.service-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `rotateX(${-y / 20}deg) rotateY(${x / 20}deg)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  });

  // Booking form submission
  const form = document.getElementById("appointment-form");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      handleFormSubmission(event);
    });
  }

  // Dark/light mode toggle button
  const toggleThemeBtn = document.getElementById("toggleThemeBtn");
  if (toggleThemeBtn) toggleThemeBtn.addEventListener("click", toggleMode);
});

// Booking slots stored in-memory for conflict check (can be replaced with server storage)
const bookedSlots = [
  { location: "Main Street", date: "2025-06-29", time: "15:00" },
  { location: "Olivia Marie Gardens", date: "2025-06-29", time: "14:30" }
];

function playCheerfulTone() {
  const tone = new Audio("sound.mp3");
  tone.play().catch(error => console.error("Audio playback failed:", error));
}

function thankUserByName(name) {
  const msg = `Thank you, ${name}, for booking your appointment with us at Five Rivers Barber Shop. We look forward to seeing you!`;
  const speech = new SpeechSynthesisUtterance(msg);
  speech.lang = "en-US";
  speech.rate = 1;
  speech.pitch = 1.1;
  window.speechSynthesis.speak(speech);
}



// Dark/light mode toggle
function toggleMode() {
  const page = document.getElementById("page");
  if (!page) return;
  const current = page.className;
  page.className = current === "light" ? "dark" : "light";
}

// Animate footer colors
function getRandomBrightColor() {
  const r = Math.floor(Math.random() * 156) + 100;
  const g = Math.floor(Math.random() * 156) + 100;
  const b = Math.floor(Math.random() * 156) + 100;
  return { r, g, b, rgb: `rgb(${r},${g},${b})` };
}
function invertColor({ r, g, b }) {
  return `rgb(${255 - r},${255 - g},${255 - b})`;
}
function animateFooterColor() {
  const footer = document.getElementById("footer-section");
  const reactionBox = document.getElementById("hover-message");

  const bgColorObj = getRandomBrightColor();
  const bgColor = bgColorObj.rgb;
  const textColor = invertColor(bgColorObj);

  footer.style.backgroundColor = bgColor;
  footer.style.color = textColor;
  Array.from(footer.querySelectorAll("*")).forEach(el => (el.style.color = textColor));

  footer.style.boxShadow = `0 0 15px 5px ${bgColor}`;
  setTimeout(() => {
    footer.style.boxShadow = "none";
  }, 1000);

  footer.style.transform = "scale(1.05)";
  setTimeout(() => {
    footer.style.transform = "scale(1)";
  }, 300);

  if (reactionBox) {
    reactionBox.classList.remove("visible");
    void reactionBox.offsetWidth; // trigger reflow
    reactionBox.innerText = `🌈 Explorer Mode Activated! Background: ${bgColor}, Text: ${textColor}`;
    reactionBox.style.color = textColor;
    reactionBox.classList.add("visible");
  }
}

// Gallery animations for batches of 3 images sliding in from different directions
function animateGalleryImages(images) {
  const animationClasses = ["slide-in-left", "slide-in-right", "slide-in-top"];
  images.forEach((img, i) => {
    img.classList.remove(...animationClasses);
    img.classList.remove("hidden");
    // trigger reflow to restart animation
    void img.offsetWidth;
    img.classList.add(animationClasses[i % animationClasses.length]);
  });
}

// Gallery toggle button logic to reveal images in batches
function setupGalleryToggle() {
  const button = document.getElementById("toggle-gallery");
  const allImages = Array.from(document.querySelectorAll(".gallery-img.hidden"));
  let currentBatch = 0;
  let clickCount = 0;

  if (!button) return;

  button.addEventListener("click", () => {
    clickCount++;
    const imagesToShow = clickCount <= 2 ? 3 : 5;
    const imagesToAnimate = allImages.slice(currentBatch, currentBatch + imagesToShow);

    animateGalleryImages(imagesToAnimate);

    currentBatch += imagesToShow;

    if (currentBatch >= allImages.length) {
      button.style.display = "none";
    }
  });

  // Clean animation classes on animation end for smooth reset
  allImages.forEach(img => {
    img.addEventListener("animationend", () => {
      img.classList.remove("slide-in-left", "slide-in-right", "slide-in-top");
    });
  });
}














// Play beep sound
function playCheerfulTone() {
  const tone = new Audio("myinstants.mp3"); // Replace with your sound file path
  tone.play();
}


// Create and show alert popup
function showAlert(barberName) {
  // Create alert box
  const alertBox = document.createElement('div');
  alertBox.innerText = `🚨 New Appointment for ${barberName}!`;
  alertBox.style.position = 'fixed';
  alertBox.style.top = '30%';
  alertBox.style.left = '50%';
  alertBox.style.transform = 'translate(-50%, -50%)';
  alertBox.style.backgroundColor = 'red';
  alertBox.style.color = 'white';
  alertBox.style.padding = '30px 50px';
  alertBox.style.fontSize = '2rem';
  alertBox.style.zIndex = '9999';
  alertBox.style.borderRadius = '10px';
  alertBox.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
  alertBox.style.textAlign = 'center';

  document.body.appendChild(alertBox);
  playBeep();

  // Auto-remove after 5 seconds
  setTimeout(() => {
    alertBox.remove();
  }, 5000);
}
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('appointment-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const barber = document.getElementById('barber-select').value;
      if (barber) {
        showAlert(barber);
      }
    });
  }
});

  // Optionally, submit form to backend here if needed
  // this.submit();  // Uncomment if you're ready to process server-side


 
  function handleFormSubmission(event) {
    event.preventDefault();

    const name = document.getElementById("customer-name").value;
    const location = document.querySelector("select[name='location']").value;
    const date = document.getElementById("appointment-date").value;
    const time = document.getElementById("appointment-time").value;

    const newBooking = {
      name,
      location,
      date,
      time,
      timestamp: new Date().toISOString()
    };

    // Store booking in localStorage
    const saved = JSON.parse(localStorage.getItem("appointments") || "[]");
    saved.push(newBooking);
    localStorage.setItem("appointments", JSON.stringify(saved));

    document.getElementById("thank-you-msg").textContent = `Thanks ${name}, your appointment is booked!`;
    document.getElementById("thank-you-msg").style.display = "block";

    loadAdminMessages();
  }

  function loadAdminMessages() {
    const section = document.getElementById("admin-messages-section");
    const list = document.getElementById("admin-messages");

    const allAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    const locationAppointments = allAppointments.filter(a => a.location === SYSTEM_LOCATION);

    if (locationAppointments.length > 0) {
      section.style.display = "block";
      list.innerHTML = "";
      locationAppointments.slice(-5).forEach(app => {
        const li = document.createElement("li");
        li.style.marginBottom = "8px";
        li.textContent = `🗓️ ${app.name} → ${app.date} at ${app.time}`;
        list.appendChild(li);
      });
    }
  }

  // Auto-load admin messages when page loads
  window.onload = loadAdminMessages;

document.addEventListener("keydown", function (e) {
  const isOwner = localStorage.getItem("isOwner") === "true";

  // Book Now
  if (e.key === "b" || e.key === "B") {
    window.location.href = "booking.html";
  }

  // Focus search field (if available in future)
  if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
    const search = document.getElementById("search");
    if (search) search.focus();
  }

  // Escape closes all modals (if any open)
  if (e.key === "Escape") {
    const modals = document.querySelectorAll(".modal");
    modals.forEach(m => m.style.display = "none");
  }

  // Owner - go to Messages
  if ((e.key === "m" || e.key === "M") && isOwner) {
    window.location.href = "owner-messages.html";
  }

  // Owner - go to Settings
  if (e.shiftKey && e.key === "S" && isOwner) {
    window.location.href = "owner-settings.html";
  }

  // Print report
  if (e.ctrlKey && e.key === "d") {
    e.preventDefault();
    window.print();
  }

  // Show shortcut help overlay
  if (e.key === "?") {
    const help = document.getElementById("shortcut-help");
    if (help) {
      help.style.display = help.style.display === "none" ? "block" : "none";
    }
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const PASSWORD = "@1313";

  const loginPanel = document.getElementById("owner-login-panel");
  const passwordInput = document.getElementById("owner-password-input");
  const loginBtn = document.getElementById("owner-login-btn");
  const loginError = document.getElementById("login-error");

  document.addEventListener("keydown", function(e) {
    if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "o") {
      e.preventDefault();

      if (sessionStorage.getItem("ownerAccessGranted") === "true") {
        window.location.href = "owner-dashboard.html";
      } else {
        loginError.style.display = "none";
        passwordInput.value = "";
        loginPanel.style.display = "block";
        passwordInput.focus();
      }
    }
  });

  loginBtn.addEventListener("click", () => {
    const enteredPass = passwordInput.value;
    if (enteredPass === PASSWORD) {
      sessionStorage.setItem("ownerAccessGranted", "true");
      window.location.href = "owner-dashboard.html";
    } else {
      loginError.style.display = "block";
      passwordInput.value = "";
      passwordInput.focus();
    }
  });
});


  // Optional: Close panel on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && loginPanel.style.display === "block") {
      loginPanel.style.display = "none";
      loginError.style.display = "none";
    }
  });

function toggleSidebar() {
  const sidebar = document.getElementById("mobileSidebar");
  sidebar.classList.toggle("show");
}

// Close sidebar when a link is clicked
document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById("mobileSidebar").classList.remove("show");
  });
});

 


  const PASSWORD = "@1313";

  const loginPanel = document.getElementById("owner-login-panel");
  const passwordInput = document.getElementById("owner-password-input");
  const loginBtn = document.getElementById("owner-login-btn");
  const loginError = document.getElementById("login-error");

  document.addEventListener("keydown", function(e) {
    if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "o") {
      e.preventDefault();

      if (sessionStorage.getItem("ownerAccessGranted") === "true") {
        window.location.href = "owner-dashboard.html";
      } else {
        loginError.style.display = "none";
        passwordInput.value = "";
        loginPanel.style.display = "block";
        passwordInput.focus();
      }
    }
  });

  loginBtn.addEventListener("click", () => {
    const enteredPass = passwordInput.value;
    if (enteredPass === PASSWORD) {
      sessionStorage.setItem("ownerAccessGranted", "true");
      window.location.href = "owner-dashboard.html";
    } else {
      loginError.style.display = "block";
      passwordInput.value = "";
      passwordInput.focus();
    }
  });

  // Optional: Close panel on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && loginPanel.style.display === "block") {
      loginPanel.style.display = "none";
      loginError.style.display = "none";
    }
  });
