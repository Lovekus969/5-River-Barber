package com.fiveriverbarber.service;

import com.fiveriverbarber.entity.Appointment;
import com.fiveriverbarber.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository repository;

    public AppointmentService(
            AppointmentRepository repository) {

        this.repository = repository;
    }

    public Appointment saveAppointment(
            Appointment appointment) {

        return repository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {

        return repository.findAll();
    }
}
