package com.vehiclerental.model;

import jakarta.persistence.*;

    @Entity
    public class Vehicle {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String brand;
        private String model;
        private String type;
        private double pricePerDay;
        private boolean available;

        public Vehicle() {}

        public Vehicle(Long id, String brand, String model, String type, double pricePerDay, boolean available) {
            this.id = id;
            this.brand = brand;
            this.model = model;
            this.type = type;
            this.pricePerDay = pricePerDay;
            this.available = available;
        }

        // getters and setters
    }

