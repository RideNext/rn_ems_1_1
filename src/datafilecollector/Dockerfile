FROM openjdk:17-jdk as jre-build
#FROM nms-artifactory.tejasnetworks.com/tej-ems/openjdk:17-jdk AS jre-build

RUN $JAVA_HOME/bin/jlink \
--verbose \
--add-modules ALL-MODULE-PATH \
--strip-debug \
--no-man-pages \
--no-header-files \
--compress=2 \
--output /customjre

# Use debian base image (same as openjdk uses)
FROM debian:11-slim
#FROM nms-artifactory.tejasnetworks.com/tej-ems/debian:11-slim

ENV JAVA_HOME=/jre
ENV PATH="${JAVA_HOME}/bin:${PATH}"

#copy JRE from the base image
COPY --from=jre-build /customjre $JAVA_HOME

EXPOSE 8100 8433

ARG user=datafile
ARG group=datafile

USER root
WORKDIR /opt/app/datafile

ADD /config/application.yaml /opt/app/datafile/config/
ADD /config/ftps_keystore.pass /opt/app/datafile/config/
ADD /config/ftps_keystore.p12 /opt/app/datafile/config/
ADD /config/keystore.jks /opt/app/datafile/config/
ADD /config/truststore.jks /opt/app/datafile/config/
ADD /config/truststore.pass /opt/app/datafile/config/




RUN mkdir -p /var/log/ONAP /opt/app/datafile/etc/cert/ && \
    addgroup $group && adduser --system --disabled-password --no-create-home --ingroup $group $user && \
    chown -R $user:$group /var/log/ONAP /opt/app/datafile/config && \
    chmod -R u+rw /opt/app/datafile/config/


USER $user

COPY --chown=$user:$group ./target/datafile-collector.jar /opt/app/datafile/
CMD ["/jre/bin/java", "-jar", "/opt/app/datafile/datafile-collector.jar"]
