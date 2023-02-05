package com.example.shoesonlineapp.service;

import com.example.shoesonlineapp.entity.OrderDetails;
import com.example.shoesonlineapp.repository.OrderRepository;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

     public OrderDetails saveOrder(OrderDetails orderDetails) {
        return orderRepository.save(orderDetails);
    }


}
