########################################################################################
#
#  Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights reserved  #
#
#######################################################################################

# Use openjdk-slim to keep the image small
FROM openjdk:17-jdk-slim
#FROM nms-artifactory.tejasnetworks.com/tej-ems/openjdk:17-jdk-slim

# Set root as the user
USER root

# Set working directory
WORKDIR /home

# Copy Maven and application files
COPY ./pom.xml ./nbi-1.0.jar ./

# Expose the port the application will run on
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "nbi-1.0.jar", "--spring.config.location=file:/home/application.properties"]

