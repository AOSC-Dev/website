#!/bin/bash

# Usage: ./scripts/updateMeiliKeys.sh
#
# A running meilisearch instance and the following env vars are required:
# - MEILI_MASTER_KEY
# - MEILI_SEARCH_KEY_UID
# - MEILI_UPDATE_KEY_UID
# - MEILI_HOST_URL (optional, defaults to http://localhost:7700)

set -euo pipefail

# Load environment variables from .env if it exists
if [ -f .env ]; then
  set -a
  source .env
  set +a
fi

MEILI_INDEX_NAME='website-content'
MEILI_HOST_URL="${MEILI_HOST_URL:-http://localhost:7700}"
MEILI_MASTER_KEY="${MEILI_MASTER_KEY:?MEILI_MASTER_KEY is required}"
MEILI_SEARCH_KEY_UID="${MEILI_SEARCH_KEY_UID:?MEILI_SEARCH_KEY_UID is required}"
MEILI_UPDATE_KEY_UID="${MEILI_UPDATE_KEY_UID:?MEILI_UPDATE_KEY_UID is required}"

# Get all existing keys
get_all_keys() {
  curl -s -X GET "${MEILI_HOST_URL}/keys" \
    -H "Authorization: Bearer ${MEILI_MASTER_KEY}"
}

# Create a key
create_key() {
  local description="$1"
  local actions="$2"
  local indexes="$3"
  local uid="$4"

  curl -s -X POST "${MEILI_HOST_URL}/keys" \
    -H "Authorization: Bearer ${MEILI_MASTER_KEY}" \
    -H "Content-Type: application/json" \
    -d "{
      \"description\": \"${description}\",
      \"actions\": ${actions},
      \"indexes\": ${indexes},
      \"uid\": \"${uid}\",
      \"expiresAt\": null
    }"
}

# Try to create a key if it doesn't already exist
try_create_key() {
  local description="$1"
  local actions="$2"
  local indexes="$3"
  local uid="$4"

  # Get all keys and check if uid exists
  local all_keys
  all_keys=$(get_all_keys)
  
  if echo "$all_keys" | grep -q "\"uid\":\"${uid}\""; then
    echo "Key already exists: $uid"
    # echo "$all_keys" | grep -A 5 "\"uid\":\"${uid}\""
  else
    echo "Creating key: $uid"
    create_key "$description" "$actions" "$indexes" "$uid"
  fi
}

# Create update key
echo "=== Creating/Checking Update Key ==="
try_create_key \
  "Key to update website content index" \
  '["documents.add", "indexes.create", "indexes.swap", "indexes.delete", "settings.update"]' \
  "[\"${MEILI_INDEX_NAME}\"]" \
  "${MEILI_UPDATE_KEY_UID}"

echo ""

# Create search key
echo "=== Creating/Checking Search Key ==="
try_create_key \
  "Public search key" \
  '["search"]' \
  "[\"${MEILI_INDEX_NAME}\"]" \
  "${MEILI_SEARCH_KEY_UID}"
