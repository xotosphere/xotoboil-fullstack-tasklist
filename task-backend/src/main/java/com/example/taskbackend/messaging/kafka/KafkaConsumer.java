package com.example.taskbackend.messaging.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaConsumer {

    @KafkaListener(topics = "task-topic", groupId = "task-group")
    public void consume(String message) {
        System.out.println("Received message from Kafka: " + message);
        // Add your custom logic here to process the message
    }
}
