package com.fiveriverbarber.repository;

import com.fiveriverbarber.entity.BarberService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BarberServiceRepository
        extends JpaRepository<BarberService, Long> {

}
