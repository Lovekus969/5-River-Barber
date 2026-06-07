package com.fiveriverbarber.service;

import com.fiveriverbarber.entity.BarberService;
import com.fiveriverbarber.repository.BarberServiceRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BarberServiceService {

    private final BarberServiceRepository repository;

    public BarberServiceService(
            BarberServiceRepository repository) {

        this.repository = repository;
    }

    public BarberService saveService(
            BarberService service) {

        return repository.save(service);
    }

    public List<BarberService> getAllServices() {

        return repository.findAll();
    }

    public void deleteService(Long id) {

        repository.deleteById(id);
    }
}
