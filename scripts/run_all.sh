#!/bin/bash

cd "$(dirname "$0")/.."

+echo "Starting the server..."
npm run server &

SERVER_PID=$!

echo "Starting React dev mode..."
npm run dev &

DEV_PID=$!

# Step 5: Wait for both processes to complete
echo "Server and Dev mode are running."
wait $SERVER_PID $DEV_PID
