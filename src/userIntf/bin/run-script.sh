#!/bin/bash

# shellcheck disable=SC1091

set -o errexit
set -o nounset
set -o pipefail
# set -o xtrace # Uncomment this line for debugging purpose

# Load libraries
. /opt/bitnami/scripts/liblog.sh
. /opt/bitnami/scripts/libnginx.sh

# Load NGINX environment variables
. /opt/bitnami/scripts/nginx-env.sh

if [ -n "${REACT_APP_EMS_TIME_ZONE:-}" ]; then
  info "** Replacing placeholder for REACT_APP_EMS_TIME_ZONE **"
  # Use 'sed' to replace the placeholder in the config.js file
  sed -i "s|PLACEHOLDER_REACT_APP_EMS_TIME_ZONE|${REACT_APP_EMS_TIME_ZONE}|g" /opt/bitnami/nginx/html/tej-ems/apiconfig.js
else
  warn "** REACT_APP_EMS_TIME_ZONE is not set. Placeholder will remain in config.js **"
fi

if [ -n "${NBI_ALLOWED_ARRAY_LIMIT:-}" ]; then
  info "** Replacing placeholder for NBI_ALLOWED_ARRAY_LIMIT **"
  # Use 'sed' to replace the placeholder in the config.js file
  sed -i "s|PLACEHOLDER_NBI_ALLOWED_ARRAY_LIMIT|${NBI_ALLOWED_ARRAY_LIMIT}|g" /opt/bitnami/nginx/html/tej-ems/apiconfig.js
else
  warn "** REACT_APP_ARRAY_SIZE is not set. Placeholder will remain in config.js **"
fi



if [ -n "${SOFTWARE_NOTIFICATION_WAIT_LIMIT:-}" ]; then
  info "** Replacing placeholder for SOFTWARE_NOTIFICATION_WAIT_LIMIT **"
  # Use 'sed' to replace the placeholder in the config.js file
  sed -i "s|PLACEHOLDER_SOFTWARE_NOTIFICATION_WAIT_LIMIT|${SOFTWARE_NOTIFICATION_WAIT_LIMIT}|g" /opt/bitnami/nginx/html/tej-ems/apiconfig.js
else
  warn "** REACT_APP_WAIT_TIME is not set. Placeholder will remain in config.js **"
fi


# Start npm

. /opt/bitnami/scripts/npm-start.sh &
. /opt/bitnami/nginx/sbin/compatible-versions.sh &

info "** Starting NGINX **"
exec "${NGINX_SBIN_DIR}/nginx" -c "$NGINX_CONF_FILE" -g "daemon off;"
