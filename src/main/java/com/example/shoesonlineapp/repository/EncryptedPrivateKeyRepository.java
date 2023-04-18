package com.example.shoesonlineapp.repository;

import com.example.shoesonlineapp.entity.EncryptedPrivateKey;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EncryptedPrivateKeyRepository extends MongoRepository<EncryptedPrivateKey, String> {


}