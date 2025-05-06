echo " ****************************** CLEANING TOPICS LOG::::: ***************************** "
docker exec  kafka /usr/bin/kafka-topics --create --topic unauthenticated.VES_MEASUREMENT_OUTPUT --partitions 1 --replication-factor 1 --bootstrap-server localhost:9092
docker exec  kafka /usr/bin/kafka-topics --create --topic unauthenticated.SEC_3GPP_FAULTSUPERVISION_OUTPUT --partitions 1 --replication-factor 1 --bootstrap-server localhost:9092
docker exec  kafka /usr/bin/kafka-topics --create --topic unauthenticated.SEC_3GPP_PROVISIONING_OUTPUT --partitions 1 --replication-factor 1 --bootstrap-server localhost:9092
docker exec  kafka /usr/bin/kafka-topics --create --topic unauthenticated.SEC_FAULT_OUTPUT --partitions 1 --replication-factor 1 --bootstrap-server localhost:9092
docker exec  kafka /usr/bin/kafka-topics --create --topic unauthenticated.VES_FILE_READY_OUTPUT --partitions 1 --replication-factor 1 --bootstrap-server localhost:9092
docker exec  kafka /usr/bin/kafka-topics --create --topic unauthenticated.VES_PNFREG_OUTPUT --partitions 1 --replication-factor 1 --bootstrap-server localhost:9092
docker exec  kafka /usr/bin/kafka-topics --create --topic unauthenticated.VES_NOTIFICATION_OUTPUT --partitions 1 --replication-factor 1 --bootstrap-server localhost:9092
