package com.example.shoesonlineapp.service;
import com.example.shoesonlineapp.config.KeyGenerator;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.*;
import java.security.spec.InvalidKeySpecException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class JwtService {


    private final KeyGenerator keyGenerator;



    public String extractUserEmail(String jwtToken) throws NoSuchAlgorithmException, InvalidKeySpecException, IOException {
        Claims claims = extractAllClaims(jwtToken);
        return claims.getSubject();
    }


    public String generateToken(UserDetails userDetails) throws NoSuchAlgorithmException, InvalidKeySpecException, IOException {
        return generateToken(new HashMap<>(), userDetails);
    }


    public String generateToken(Map<String, Object> extraClaim, UserDetails userDetails) throws NoSuchAlgorithmException, InvalidKeySpecException, IOException {


        System.out.println(keyGenerator.getPrivateKey());

        return Jwts
                .builder()
                .setClaims(extraClaim)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000))
                .signWith(keyGenerator.getPrivateKey(), SignatureAlgorithm.RS256)
                .compact();
    }


    private Claims extractAllClaims(String token) throws NoSuchAlgorithmException, InvalidKeySpecException, IOException {


        return Jwts
                .parserBuilder()
                .setSigningKey(keyGenerator.getPrivateKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }


    public boolean isTokenValid(String token, UserDetails userDetails)
            throws NoSuchAlgorithmException, InvalidKeySpecException, IOException {

        final String username = extractUserEmail(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));

    }

    private boolean isTokenExpired(String token) throws NoSuchAlgorithmException, InvalidKeySpecException, IOException {
        return extractExpiration(token).before(new Date());
    }


    private Date extractExpiration(String token) throws NoSuchAlgorithmException, InvalidKeySpecException, IOException {
        Claims claims = extractAllClaims(token);
        return claims.getExpiration();
    }




}
