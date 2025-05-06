#!/bin/bash

cd /app/nodeServer/dist
chown -R 1000:0 /app/nodeServer/pnffiles/
npm start
