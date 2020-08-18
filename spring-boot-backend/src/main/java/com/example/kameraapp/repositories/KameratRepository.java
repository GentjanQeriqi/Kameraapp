package com.example.kameraapp.repositories;

import com.example.kameraapp.models.Kamerat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KameratRepository extends MongoRepository<Kamerat, String> {

}