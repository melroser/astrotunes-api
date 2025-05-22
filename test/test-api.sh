#!/bin/bash

echo "Testing AstroTunes API..."

curl -X POST http://localhost:3001/api/astro \
  -H "Content-Type: application/json" \
  -d @sample-astro-data.json \
  | jq '.'

echo "\nTest complete!"
