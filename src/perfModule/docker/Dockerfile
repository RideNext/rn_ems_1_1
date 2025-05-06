# Set DB Type as SQL
# Valid are NONE, SQL
ARG DB_TYPE=NONE

FROM ubuntu:18.04

USER root

# Install dependencies in a single RUN command
RUN apt-get update && apt-get install -y \
    software-properties-common \
    sudo \
    curl \
    vim \
    python3.8 \
    python3-pip \
    inotify-tools \
    incron \
    jq \
    wget \
    bc \
    docker.io && \
    rm /usr/bin/python3 && \
    ln -s /usr/bin/python3.8 /usr/bin/python3 && \
    ln -s /usr/bin/python3.8 /usr/bin/python && \
    rm -rf /var/lib/apt/lists/*

# Verify installations
RUN python3 --version && python --version && pip3 --version

# Set DB_TYPE environment variable
ARG DB_TYPE=${DB_TYPE}
ENV PERF_DB_TYPE=$DB_TYPE

# Install DB specific packages based on DB_TYPE
RUN if [ "$DB_TYPE" = "ELASTIC" ]; then pip3 install elasticsearch==7.1.0; fi
RUN if [ "$DB_TYPE" = "SQL" ]; then pip3 install mysql-connector-python; fi

# Create necessary directories and set permissions
RUN mkdir -p /home/perfModule/{rawXml,procesedXml,csvFiles,errorXml,perfMonitor} && \
    chown -R root:root /home/perfModule

WORKDIR /home/perfModule

# Copy files
COPY ./perfMonitor/* /home/perfModule/perfMonitor/

# Expose port
EXPOSE 8853/udp

# Entry point to start Docker and perfMon.sh script
ENTRYPOINT dockerd & /home/perfModule/perfMonitor/perfMon.sh $SDNR_IP_ADDRESS

