FROM openjdk:20-jdk

WORKDIR /task-backend

COPY build/libs/task-backend-0.0.1-SNAPSHOT.jar task-backend-0.0.1-SNAPSHOT-plain.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "task-backend-0.0.1-SNAPSHOT-plain.jar"]
