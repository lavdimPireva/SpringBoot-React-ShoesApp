package com.example.shoesonlineapp.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "cart_items")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CartItem {

    @Id
    private String id;

    private String name;

    private int selectedSeries;

    private double price;




}
