#!/bin/bash

# Copyright @ 2025 Tejas Networks 

# Check if a number of devices is passed as an argument
if [ -z "$1" ]; then
    echo "Usage: $0 <number_of_devices>"
    exit 1
fi

# Number of devices to create
num_devices=$1

# Loop through the number of devices
for i in $(seq 1 $num_devices)
do
    # Define the device name as server1, server2, etc.
    device="server$i"

    # Create a folder for the device
    mkdir -p "$device"

    # Generate a new private key for each device
    openssl genrsa -out "${device}/${device}.key" 2048 2>/dev/null

    # Create a new Certificate Signing Request (CSR) for each device
    openssl req -new -sha256 -key "${device}/${device}.key" -subj "/C=IN/ST=KARNATAKA/L=BENGALURU/O=Tejas/OU=NMS/CN=tejasnetworks.com/emailAddress=manishti@tejasnetworks.com" -out "${device}/${device}.csr" 2>/dev/null

    # Sign the certificate with our own CA for each device
    openssl x509 -req -in "${device}/${device}.csr" -CA ca.pem -CAkey ca.key -CAcreateserial -out "${device}/${device}.cert" -days 3650 -sha256 2>/dev/null

    # Clean up the CSR after signing
    rm "${device}/${device}.csr"
done

exit 0
