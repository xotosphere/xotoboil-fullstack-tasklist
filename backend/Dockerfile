FROM openjdk:20-jdk

WORKDIR /backend

COPY build/libs/backend-0.0.1-SNAPSHOT.jar backend-0.0.1-SNAPSHOT-plain.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "backend-0.0.1-SNAPSHOT-plain.jar"]
