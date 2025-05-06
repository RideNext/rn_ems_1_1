Note:
1. To run Tests navigate to /nbi/src/main/resources/application.properties
2. Modify  spring.data.elasticsearch.cluster-nodes= persistence:9200 to spring.data.elasticsearch.cluster-nodes= http://<IP>:9200
3. Modify spring.elasticsearch.rest.uris= persistence:9200 to spring.elasticsearch.rest.uris=http://<IP>:9200
4. Modify swagger.server-url= https://${NBI_IP}:8453 to https://<IP>:8453
 
