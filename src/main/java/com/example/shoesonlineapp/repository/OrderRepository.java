package com.example.shoesonlineapp.repository;

import com.example.shoesonlineapp.entity.OrderDetails;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends MongoRepository<OrderDetails, String> {
}
