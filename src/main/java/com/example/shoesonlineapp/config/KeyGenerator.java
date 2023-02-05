package com.example.shoesonlineapp.config;


import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;

@Configuration
public class KeyGenerator {

    private PrivateKey privateKey;


    @PostConstruct
    public void generateKey() throws NoSuchAlgorithmException {
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
        keyGen.initialize(2048);
        KeyPair keyPair = keyGen.generateKeyPair();
        this.privateKey = keyPair.getPrivate();
    }

    public PrivateKey getPrivateKey() {
        return privateKey;
    }



}
