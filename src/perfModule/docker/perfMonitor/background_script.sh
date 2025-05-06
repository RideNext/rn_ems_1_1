monitor_pid=$!
while true; do
  if ! docker inspect "$(hostname)" &>/dev/null; then
    echo "Container has stopped. Killing monitor script."
    kill -9 "$monitor_pid"
    exit
  fi
  bash /home/perfModule/perfMonitor/Monitor.sh
  sleep ${DELAY} 
done
