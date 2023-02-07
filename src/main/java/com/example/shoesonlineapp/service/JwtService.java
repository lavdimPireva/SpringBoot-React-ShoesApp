package com.example.shoesonlineapp.service;
import com.example.shoesonlineapp.config.KeyGeneratorAndEncryption;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.io.IOException;
import java.security.*;
import java.security.spec.InvalidKeySpecException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class JwtService {


    private final KeyGeneratorAndEncryption keyGenerator;



    public String extractUserEmail(String jwtToken) throws NoSuchAlgorithmException, InvalidKeySpecException, IOException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, InvalidKeyException, ClassNotFoundException {
        Claims claims = extractAllClaims(jwtToken);
        return claims.getSubject();
    }


    public String generateToken(UserDetails userDetails) throws NoSuchAlgorithmException, InvalidKeySpecException, IOException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, InvalidKeyException, ClassNotFoundException {
        return generateToken(new HashMap<>(), userDetails);
    }


    public String generateToken(Map<String, Object> extraClaim, UserDetails userDetails) throws NoSuchAlgorithmException, InvalidKeySpecException, IOException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, InvalidKeyException, ClassNotFoundException {


        System.out.println("The key: " + keyGenerator.getPrivateKey());



        return Jwts
                .builder()
                .setClaims(extraClaim)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000))
                .signWith(keyGenerator.getPrivateKey(), SignatureAlgorithm.RS256)
                .compact();
    }





    // This method verify the token if its been changed over the communication between client and server.
    // it verify using public key.
    private Claims extractAllClaims(String token) throws NoSuchAlgorithmException, InvalidKeySpecException, IOException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, InvalidKeyException, ClassNotFoundException {

        return Jwts
                .parserBuilder()
                .setSigningKey(keyGenerator.getPublicKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }






    public boolean isTokenValid(String token, UserDetails userDetails)
            throws NoSuchAlgorithmException, InvalidKeySpecException, IOException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, InvalidKeyException, ClassNotFoundException {

        final String username = extractUserEmail(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));

    }

    private boolean isTokenExpired(String token) throws NoSuchAlgorithmException, InvalidKeySpecException, IOException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, InvalidKeyException, ClassNotFoundException {
        return extractExpiration(token).before(new Date());
    }


    private Date extractExpiration(String token) throws NoSuchAlgorithmException, InvalidKeySpecException, IOException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, InvalidKeyException, ClassNotFoundException {
        Claims claims = extractAllClaims(token);
        return claims.getExpiration();
    }




}
