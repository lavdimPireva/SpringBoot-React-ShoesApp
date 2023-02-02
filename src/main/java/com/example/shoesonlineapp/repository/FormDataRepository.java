package com.example.shoesonlineapp.repository;

import com.example.shoesonlineapp.entity.FormData;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FormDataRepository extends MongoRepository<FormData, String> {
}