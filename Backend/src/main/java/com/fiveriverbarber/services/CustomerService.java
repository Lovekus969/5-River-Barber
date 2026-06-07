package com.fiveriverbarber.service;

import com.fiveriverbarber.entity.Customer;
import com.fiveriverbarber.repository.CustomerRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository repository;

    public CustomerService(
            CustomerRepository repository) {

        this.repository = repository;
    }

    public Customer saveCustomer(
            Customer customer) {

        return repository.save(customer);
    }

    public List<Customer> getAllCustomers() {

        return repository.findAll();
    }

    public void deleteCustomer(Long id) {

        repository.deleteById(id);
    }
}
