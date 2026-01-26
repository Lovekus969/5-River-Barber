5 River Barber — Customer Interaction & Management System
🧾 Overview

5 River Barber is a real-world web-based system designed to improve customer interaction and business operations for a local barbershop.
The system allows customers to explore services, submit appointment requests, and contact the shop owner digitally, replacing manual communication methods.

This project demonstrates the application of Software Engineering principles, System Analysis, and Web Development concepts.
  System Design (High-Level)

    This system is modeled using state-based thinking, inspired by:
        Finite Automata
        AI problem-solving agents
        System analysis models
🔹 System States
Guest  User who has not logged in
      Can view services
      Can make bookings (public access)
Authenticated User
      Logged-in user with a valid identity
      Can manage personal bookings
      Can access protected user features

Authorized Owner/Admin
      User with elevated permissions
      Can access owner dashboard
      Can manage appointments
      Can control system-level settings

🔁 State Transitions

      Login → Guest → Authenticated User
        Authorization Check → Authenticated User → Owner/Admin
          Logout → Any state → Guest
            Invalid / Expired Token → Authenticated User → Guest
These transitions are enforced using backend validation and JWT-based authentication, ensuring correctness and security.
  💡 Proposed Solution

A responsive web-based system that:
      Collects customer details digitally
      Allows appointment requests
      Provides service information and location access
      Helps the owner manage customer interactions efficiently

⚙️ Core Features

Customer booking form

Service listing & pricing

Gallery of hairstyles

Google Maps integration (multiple locations)

Owner control panel (frontend prototype)

Daily income calculator

Responsive UI (desktop & mobile)
