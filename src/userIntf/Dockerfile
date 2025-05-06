# Stage 1: Builder Stage
FROM node:16-slim AS builder
#FROM nms-artifactory.tejasnetworks.com/tej-ems/node:16-slim AS builder

# Set working directory for building
WORKDIR /build

# Copy Node.js application code
COPY ./code/Node-api-services/ ./Node-api-services

# Install dependencies and build the application
RUN npm install --prefix ./Node-api-services  && \
    npm run build --prefix ./Node-api-services

# Stage 2: Runtime Stage with Nginx
FROM docker.io/bitnami/nginx:1.21-debian-10
#FROM nms-artifactory.tejasnetworks.com/tej-ems/nginx:1.21-debian-10

# Switch to root user for installation
USER root

# Install required runtime packages and clean up afterwards
RUN apt-get update && apt-get install -y \
    python3-minimal \
    python3-urllib3 \
    curl \
    unzip \
    openssl \
    net-tools \
    iputils-ping \
    jq \
    bc \
    docker.io && \
    curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*


# Create user and group 'www' for nginx to avoid errors
RUN groupadd -r www && useradd -r -g www -d /opt/bitnami/nginx -s /bin/bash www

# Copy application build artifacts from the builder stage
COPY --from=builder /build/Node-api-services /app/nodeServer

# Copy ODLUX files to Nginx html directory
COPY html /opt/bitnami/nginx/html

# Copy configuration and scripts
COPY ./conf/location.rules /opt/bitnami/nginx/conf/server_blocks/location.rules
COPY ./conf/https_site.conf /opt/bitnami/nginx/conf/server_blocks/https_site.conf
COPY ./bin/npm-start.sh /opt/bitnami/scripts/npm-start.sh
COPY ./bin/* /opt/bitnami/nginx/sbin/
COPY ./bin/run-script.sh /opt/bitnami/scripts/nginx/run.sh

# Adjust permissions for required files and directories
RUN chmod +x /opt/bitnami/nginx/sbin/run.sh \
              /opt/bitnami/nginx/sbin/opm.py \
              /opt/bitnami/scripts/nginx/run.sh && \
    chmod -R g+w /opt/bitnami/nginx/html/tej-ems && \
    mkdir -p /app/init.d && \
    chmod 666 /opt/bitnami/nginx/conf/server_blocks/*.* && \
    chown -R root:root /app && \
    mkdir -p /.npm && \
    chown -R root:root /.npm && \
    ln -s /opt/bitnami/nginx/sbin/opm.py /usr/local/bin/opm

# Expose application port
EXPOSE 3001

# Start the Docker daemon and Nginx
CMD ["sh", "-c", "dockerd --host=unix:///var/run/docker.sock & /opt/bitnami/nginx/sbin/run.sh"]

