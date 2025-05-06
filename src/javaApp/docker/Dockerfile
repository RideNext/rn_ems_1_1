FROM nexus3.onap.org:10001/onap/sdnc-image:2.5.5
# Use the base image from Tejas Networks
#FROM nms-artifactory.tejasnetworks.com/tej-ems/sdnc-image:2.5.5

# Use a single RUN command to minimize layers and reduce image size
USER root

# Combine apk commands, remove unnecessary files, and minimize layers
RUN apk add --no-cache curl curl-dev \
    && chown -R odl:odl /opt /opt/opendaylight/etc \
    && chmod -R 777 /opt/opendaylight/etc \
    && rm -rf /var/cache/apk/* /tmp/* /var/tmp/* /opt/opendaylight/logs/*

# Use a single COPY command for all files to reduce layers
COPY ./lib/system /tmp/system
COPY ./cfg/startODL.sh /opt/sdnc/bin/startODL.sh
COPY ./cfg/createIndex.sh /opt/sdnc/bin/createIndex.sh

# Minimize permissions adjustment layers and remove unnecessary temporary files
RUN rsync -a /tmp/system /opt/opendaylight \
    && chmod +x /opt/sdnc/bin/createIndex.sh \
    && rm -rf /tmp/system

USER odl
ENTRYPOINT ["/opt/onap/sdnc/bin/startODL.sh"]

# Expose necessary ports
EXPOSE 8181

