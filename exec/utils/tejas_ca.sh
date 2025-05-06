#!/bin/bash

# Copyright @ 2025 Tejas Networks


# Define file paths
CA_KEY="ca.key"
CA_CERT="ca.pem"

# Prompt for the details for the CA certificate
echo "Generating Certificate Authority (CA)..."

# Step 1: Generate the CA private key (encrypted with AES-256)
openssl genpkey -algorithm RSA -out "$CA_KEY" -aes256

# Step 2: Generate the self-signed CA certificate (CA.pem)
openssl req -new -x509 -key "$CA_KEY" -out "$CA_CERT" -days 3650 -sha256 -subj "/C=IN/ST=KARNATAKA/L=BENGALURU/O=Tejas/OU=NMS/CN=tejasnetworks.com/emailAddress=manishti@tejasnetworks.com"

# Output information about the generated files
echo "CA Private Key: $CA_KEY"
echo "CA Certificate: $CA_CERT"
echo "Your Certificate Authority (CA) certificate (ca.pem) has been generated successfully."

# Display the content of the generated CA certificate (optional)
openssl x509 -in "$CA_CERT" -text -noout

