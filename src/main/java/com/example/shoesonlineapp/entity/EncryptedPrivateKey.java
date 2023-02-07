package com.example.shoesonlineapp.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "encrypted_private_keys")
public class EncryptedPrivateKey {

    @Id
    private String id;

    private byte[] encryptedPrivateKey;






}
