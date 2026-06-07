package com.fiveriverbarber.controller;

import com.fiveriverbarber.entity.Customer;
import com.fiveriverbarber.service.CustomerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    private final CustomerService service;

    public CustomerController(CustomerService service) {
        this.service = service;
    }

    // Add customer
    @PostMapping
    public Customer addCustomer(
            @RequestBody Customer customer) {

        return service.saveCustomer(customer);
    }

    // Get all customers
    @GetMapping
    public List<Customer> getCustomers() {

        return service.getAllCustomers();
    }
}
