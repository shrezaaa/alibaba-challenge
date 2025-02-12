#!/bin/bash

cd "$(dirname "$0")/.."

echo "Building Docker image..."
sudo docker build -t react-nginx .

if [ $? -ne 0 ]; then
  echo "Docker build failed. Exiting."
  exit 1
fi

echo "Starting the server..."
npm run server &

# Capture the process ID of the server
SERVER_PID=$!

echo "Running Docker container..."
sudo docker run -p 3000:80 react-nginx &

DOCKER_PID=$!

echo "Docker container is running on http://localhost:3000"
echo "Server is running concurrently."

wait $SERVER_PID $DOCKER_PID
