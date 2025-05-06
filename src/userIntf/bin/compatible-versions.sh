#!/bin/bash

versionsDataPath="/app/nodeServer/software-version-details.json"
url="http://persistence:9200/software_versions/_doc/1"
curl -s -X POST "$url" -H "Content-Type: application/json" -d @"$versionsDataPath" > /dev/null

if [ $? -eq 0 ]; then
    echo "Data posted successfully!"
else
    echo "Failed to post data."
fi