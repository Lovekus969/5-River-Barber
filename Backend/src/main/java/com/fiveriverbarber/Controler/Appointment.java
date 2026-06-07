package com.fiveriverbarber.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String serviceName;
    private String location;

    // Empty constructor
    public Appointment() {
    }

    // Constructor
    public Appointment(String customerName,
                       String serviceName,
                       String location) {

        this.customerName = customerName;
        this.serviceName = serviceName;
        this.location = location;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
