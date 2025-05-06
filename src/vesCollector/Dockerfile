################################################################################################
#                                                                                              #
#   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights reserved          #
#                                                                                              #
################################################################################################

FROM openjdk:11.0.11-jre-slim

ENV HOSTALIASES /etc/host.aliases

# Set working directory
WORKDIR /opt/app/VESCollector

# Copy the application code
COPY . .

# Create non-root user and set correct permissions
RUN useradd -r -U vescollector && \
    mkdir -p /opt/app/VESCollector/logs1 /opt/app/VESCollector/lib /opt/app/VESCollector/bin && \
    chown -R vescollector:vescollector /opt/app

# Copy necessary files for the application
COPY ./target/VESCollector-1.10.1/lib/* /opt/app/VESCollector/lib/
COPY ./src/main/scripts/* /opt/app/VESCollector/bin/

# Set ownership and executable permissions for scripts
RUN chown -R vescollector:vescollector /opt/app/VESCollector/lib /opt/app/VESCollector/bin && \
    chmod +x /opt/app/VESCollector/bin/*

# Install necessary packages and clean up to reduce image size
RUN apt-get update && \
    apt-get install -y --no-install-recommends procps less vim curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Expose ports
EXPOSE 8080 8443

# Switch to non-root user
USER vescollector

# Command to run the application
CMD ["bin/docker-entry.sh"]

