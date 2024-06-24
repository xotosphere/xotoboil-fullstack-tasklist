package com.example.backend.messaging.rabbitmq;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class RabbitMQProducer {

    private final RabbitTemplate rabbitTemplate;

    public RabbitMQProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void produce(String message) {
        rabbitTemplate.convertAndSend("task-queue", message);
        System.out.println("Produced message to RabbitMQ: " + message);
    }

    @Bean
    public Queue taskQueue() {
        return new Queue("task-queue");
    }
}
