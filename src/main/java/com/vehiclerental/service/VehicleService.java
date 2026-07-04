package com.vehiclerental.service;

import com.vehiclerental.model.Vehicle;
import com.vehiclerental.repository.VehicleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

    @Service
    public class VehicleService {

        private final VehicleRepository repo;

        public VehicleService(VehicleRepository repo) {
            this.repo = repo;
        }

        public Vehicle saveVehicle(Vehicle v) {
            return repo.save(v);
        }

        public List<Vehicle> getAllVehicles() {
            return repo.findAll();
        }
    }

