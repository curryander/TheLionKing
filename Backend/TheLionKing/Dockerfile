FROM amazoncorretto:21-alpine3.23
LABEL maintainer="Daniel Hohmann daniel.hohmann21@gmail.com"
COPY target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]