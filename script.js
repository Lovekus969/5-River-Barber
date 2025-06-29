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

  // GSAP gallery scroll animation
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".gallery-img").forEach((img, index) => {
      const directions = ["left", "right", "top", "bottom"];
      const direction = directions[index % 4];
      gsap.from(img, {
        scrollTrigger: {
          trigger: img,
          start: "top 90%",
          toggleActions: "play none none reset"
        },
        x: direction === "left" ? -200 : direction === "right" ? 200 : 0,
        y: direction === "top" ? -200 : direction === "bottom" ? 200 : 0,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });
    });
  }

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Toggle Gallery View
  const btn = document.getElementById('toggle-gallery');
  const hiddenImages = document.querySelectorAll('.gallery-img.hidden');
  let shownCount = 3;
  let clickCount = 0;

  if (btn) {
    btn.addEventListener('click', () => {
      clickCount++;
      let imagesToShow = clickCount <= 2 ? 3 : 5;

      for (let i = shownCount; i < shownCount + imagesToShow && i < hiddenImages.length + 3; i++) {
        if (hiddenImages[i - 3]) {
          hiddenImages[i - 3].classList.remove('hidden');
        }
      }

      shownCount += imagesToShow;
      if (shownCount >= hiddenImages.length + 3) btn.style.display = 'none';
    });
  }
});

// Toggle Dark/Light Mode
function toggleMode() {
  const page = document.getElementById("page");
  if (!page) return;
  const current = page.getAttribute("class");
  page.setAttribute("class", current === "light" ? "dark" : "light");
}
document.getElementById("toggleThemeBtn")?.addEventListener("click", toggleMode);

// Tilt Animation on Service Buttons
document.querySelectorAll('.service-btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `rotateX(${ -y / 20 }deg) rotateY(${ x / 20 }deg)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
});

// Booking Logic
const bookedSlots = [
  { location: "Main Street", date: "2025-06-29", time: "15:00" },
  { location: "Olivia Marie Gardens", date: "2025-06-29", time: "14:30" }
];

function playCheerfulTone() {
  const tone = new Audio("sounds/myinstants.mp3");
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

function handleFormSubmission(event) {
  event.preventDefault();

  const name = document.getElementById("customer-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const notes = document.getElementById("notes").value.trim();
  const location = document.querySelector("select[name='location']").value;
  const barber = document.getElementById("barber-select").value;
  const date = document.getElementById("appointment-date").value;
  const time = document.getElementById("appointment-time").value;

  const isConflict = bookedSlots.some(
    (slot) => slot.location === location && slot.date === date && slot.time === time
  );

  if (isConflict) {
    alert(" This time slot is already booked for the selected location. Please pick a different time.");
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

document.getElementById("appointment-form")?.addEventListener("submit", handleFormSubmission);

document.getElementById("barber-select")?.addEventListener("change", function () {
  const otherBarberInput = document.getElementById("otherBarber");
  if (otherBarberInput) {
    otherBarberInput.style.display = this.value === "other" ? "block" : "none";
  }
});

// Populate Haircut Offers
const basicOffers = [
  { name: "Classic Haircut", desc: "Timeless style." },
  { name: "Fade Cuts", desc: "Stylish fade." },
  { name: "Buzz Cuts", desc: "Low-maintenance style." },
  { name: "Pompadours", desc: "Bold and stylish." },
  { name: "Undercuts", desc: "Sleek and edgy." }
];

const basicOffersList = document.getElementById("basicOffersList");
if (basicOffersList) {
  basicOffers.forEach(offer => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${offer.name}</strong> - ${offer.desc}`;
    basicOffersList.appendChild(li);
  });
}

// Populate Pricing Table
const haircutPrices = [
  { type: "Classic Haircut", cad: 25, usd: 18 },
  { type: "Fade Cut", cad: 30, usd: 22 },
  { type: "Buzz Cut", cad: 20, usd: 15 },
  { type: "Pompadour", cad: 35, usd: 26 },
  { type: "Undercut", cad: 28, usd: 21 }
];

const pricingTable = document.getElementById("pricingTable");
if (pricingTable) {
  haircutPrices.forEach(price => {
    const row = document.createElement("div");
    row.className = "pricing-row";
    row.innerHTML = `
      <div class="pricing-type">${price.type}</div>
      <div class="pricing-price">${price.cad}</div>
      <div class="pricing-price">${price.usd}</div>
    `;
    pricingTable.appendChild(row);
  });
}

// Animate footer background and text color
function animateFooterColor() {
  const footer = document.getElementById("footer-section");
  const reactionBox = document.getElementById("footer-reaction");

  const bgColorObj = getRandomBrightColor();
  const bgColor = bgColorObj.rgb;
  const textColor = invertColor(bgColorObj);

  footer.style.backgroundColor = bgColor;
  footer.style.color = textColor;
  Array.from(footer.querySelectorAll("*")).forEach(el => (el.style.color = textColor));

  // Glow effect
  footer.style.boxShadow = `0 0 15px 5px ${bgColor}`;
  setTimeout(() => {
    footer.style.boxShadow = "none";
  }, 1000);

  // Scale effect
  footer.style.transform = "scale(1.05)";
  setTimeout(() => {
    footer.style.transform = "scale(1)";
  }, 300);

  // Fade in message
  reactionBox.classList.remove("visible");
  void reactionBox.offsetWidth; // reflow
  reactionBox.innerText = `🌈 Explorer Mode Activated! Background: ${bgColor}, Text: ${textColor}`;
  reactionBox.style.color = textColor;
  reactionBox.classList.add("visible");
}

