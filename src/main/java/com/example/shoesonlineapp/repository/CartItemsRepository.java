package com.example.shoesonlineapp.repository;

import com.example.shoesonlineapp.entity.CartItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemsRepository extends MongoRepository<CartItem, String> {
}