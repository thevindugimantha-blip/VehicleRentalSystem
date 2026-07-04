package com.vehiclerental.controller;

import com.vehiclerental.model.Vehicle;
import com.vehiclerental.service.VehicleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

    @RestController
    @RequestMapping("/vehicles")
    public class VehicleController {

        private final VehicleService service;

        public VehicleController(VehicleService service) {
            this.service = service;
        }

        @PostMapping
        public Vehicle addVehicle(@RequestBody Vehicle vehicle) {
            return service.saveVehicle(vehicle);
        }

        @GetMapping
        public List<Vehicle> getAllVehicles() {
            return service.getAllVehicles();
        }
    }

