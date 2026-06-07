package com.fiveriverbarber.controller;

import com.fiveriverbarber.entity.Appointment;
import com.fiveriverbarber.service.AppointmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    private final AppointmentService service;

    public AppointmentController(AppointmentService service) {
        this.service = service;
    }

    // Create appointment
    @PostMapping
    public Appointment createAppointment(
            @RequestBody Appointment appointment) {

        return service.saveAppointment(appointment);
    }

    // Get all appointments
    @GetMapping
    public List<Appointment> getAppointments() {

        return service.getAllAppointments();
    }
}
