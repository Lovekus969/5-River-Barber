package com.fiveriverbarber.repository;

import com.fiveriverbarber.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository
        extends JpaRepository<Appointment, Long> {

}
