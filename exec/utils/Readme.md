Step1: Steps to Generate CA:

1. Generate CA Certificate
   1. Run the tejas_ca.sh script located at /exec/utils to generate the CA certificate.
      ./tejas_ca.sh 
   2. Enter a passphrase (e.g., tejas) when prompted. 
   3. The following files will be generated: 
      ca.pem: The CA certificate.
      ca.key: The private key for the CA.
   
Step2: Steps to Generate Client Certificate:

2. Generate Client Certificate
   1. Run the generate-client-cert.sh script located at /exec/utils to generate the client certificate:
      ./generate-client-cert.sh 
   2. Enter the same passphrase used during CA certificate generation (e.g., tejas). 
   3. The following files will be generated:
      ca.srl: The CA serial number file. 
      client.crt: The client certificate.
      client.key: The client private key.

Step3: Steps to Install Certificate at EMS:

1. Package Certificates
   1. Create a directory named keys0:
      mkdir keys0 
   2. Move the following files to the keys0 directory: 
      client.crt 
      client.key
      ca.pem
      Note: These are files generated using step1 and step2
   3. Rename ca.pem to trustedCertificates.pem:
      mv keys0/ca.pem keys0/trustedCertificates.pem
   4. Create a zip file of the keys0 directory: 
      zip -r keys0.zip keys0
   5. Transfer the keys0.zip file to the following directory:
      /exec/smo/oam/sdnr/certs
   6. Update the Certs.properties file to reference keys0.zip with stars as follows: 
      keys0.zip
      ***********
   7. Open the docker-compose.yml file under the SDNR container, located at:
      /exec/smo/oam
   8. Add the following volume mount to the sdnr container configuration: 
      volumes:
        - ./sdnr/certs/keys0.zip:${SDNC_CERT_DIR}/keys0.zip

Step4: Steps to Install Certificate at gNB:

1. Generate Server Certificate
   1. Run the generate-server-cert.sh script located at /exec/utils to generate the client certificate. Ensure that You are providing number of server certificates to be generated:
      ./generate-server-cert.sh < no of devices >
   2. Enter the same passphrase used during CA certificate generation (e.g., tejas). 
   3. The following directories will be generated based on the number of devices provided Ex: If 2 :
      server1 -- contains the server certificates for 1 device
      -- server1.cert
      -- server1.key
      server2 -- contains the server certificates for 2 device
      -- server2.cert
      -- server2.key

2. Package Certificates
   1. Move the following files to the gNB: 
      client.crt 
      client.key
      ca.pem
      Note: These are files generated using step1 and step2
      server1.cert
      server2.key
   2. Execute the following script at gNB sysrepo_tls.sh to replace the certs information at sysrepo.
      ./sysrepo_tls.sh
      Note:
      Ensure that below files are present in the same dir before executing the script
      -- tls_keystore.xml
      -- tls_listen.xml
      -- tls_truststore.xml
      -- sysrepo_tls.sh
      -- ca.pem
      -- client.key
      -- server1.key
      -- client.crt
      -- server1.cert

      
Optional: Steps to Install Certificate at Simulator

1. Package Certificates
   1. Move the following files to the src/simulator/ntsim/deploy/base directory: 
      client.crt 
      client.key
      ca.pem
      Note: These are files generated using step1 and step2
   2. Execute the below command to get the Client Fingerprint:
      openssl x509 -in client.crt -noout -fingerprint -sha1 
   3. Replace the client fingerprint in the following files. Ensure that the fingerprint is prefixed with 02: :
      1. /src/simulator/ntsim/ntsim-ng/core/nc_config.c 
      Ex:  "02:B9:6C:1D:25:1B:72:85:09:9D:94:5D:E1:4B:8F:5B:92:8A:50:28:71"
      2. /src/simulator/ntsim/ntsim-ng/features/netconf_call_home/netconf_call_home.c
      Ex:  "02:B9:6C:1D:25:1B:72:85:09:9D:94:5D:E1:4B:8F:5B:92:8A:50:28:71"
   4. Execute the following script from this /src/simulator/ntsim dir to build new simulator image with modified certificates.
      nts_build_o_du_rel_18.sh <tag>
      Note: The <tag> parameter is optional. If not provided, a random tag will be assigned to the image.
