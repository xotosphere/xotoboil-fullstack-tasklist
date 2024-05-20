package com.example.taskbackend.messaging.rabbitmq;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class RabbitMQConsumer {

    @RabbitListener(queues = "task-queue")
    public void consume(String message) {
        System.out.println("Received message from RabbitMQ: " + message);
        // Add your custom logic here to process the message
    }
}
