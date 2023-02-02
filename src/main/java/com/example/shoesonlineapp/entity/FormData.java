package com.example.shoesonlineapp.entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FormData {

    @Id
    private String id;
    private String name;
    private String surname;
    private String address;
    private String country;
    private String city;
    private String phoneNumber;

}
