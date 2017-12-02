# gets account data
curl "http://localhost:3000/accounts"

# posts account data
curl -H "Content-Type: application/json" \
  -X POST -d '{"balance": "1000", "name": "savings"}' \
  --url "http://localhost:3000/accounts"

# updates account data at specific id
curl -H "Content-Type: application/json" \
  -X PUT -d '{"balance": "1500"}' \
  --url "http://localhost:3000/accounts/5a2118d345e83b45f8684f98"

# deletes account data at specific id
curl -X DELETE "http://localhost:3000/posts/666666666666666666666666"