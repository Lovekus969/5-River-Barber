package com.fiveriverbarber.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "services")
public class BarberService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String serviceName;

    private Double price;

    @OneToMany(mappedBy = "service")
    private List<Appointment> appointments;

    public BarberService() {
    }

    public BarberService(String serviceName,
                         Double price) {

        this.serviceName = serviceName;
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(
            String serviceName) {

        this.serviceName = serviceName;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(
            Double price) {

        this.price = price;
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(
            List<Appointment> appointments) {

        this.appointments = appointments;
    }
}
