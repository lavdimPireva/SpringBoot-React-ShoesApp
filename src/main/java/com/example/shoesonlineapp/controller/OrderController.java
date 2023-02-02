package com.example.shoesonlineapp.controller;
import com.example.shoesonlineapp.entity.OrderDetails;
import com.example.shoesonlineapp.service.OrderService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/orders")
public class OrderController {


    private final OrderService orderService;
    public OrderController(OrderService orderService) {
        this.orderService = orderService;

    }

    @PostMapping
    public OrderDetails saveOrder(@RequestBody OrderDetails orderDetails) {
//        System.out.println("Order Details : " + orderDetails);
        return orderService.saveOrder(orderDetails);
    }

}
