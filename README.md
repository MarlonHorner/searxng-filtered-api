# SearXNG with API Limiter

Simple setup for SearXNG with an API proxy that allows limiting search results.

## Quick Start

1. **Clone/Download** these files
2. **Edit** `docker-compose.yml`:
   - Change `BASE_URL` to your domain
   - Change `SEARXNG_SECRET` (random string)
3. **Start**:
   ```bash
   docker-compose up -d
   ```

## Services

- **SearXNG**: http://localhost:8888
- **Limited API**: http://localhost:3100

## API Usage

```bash
# Standard SearXNG API (unlimited results)
curl "http://localhost:8888/search?q=test&format=json"

# Limited API (default: 3 results)
curl "http://localhost:3100/search?q=test&result_limit=5"
```

## API Parameters

- `q` - Search query (required)
- `result_limit` - Number of results (default: 3)
- `language` - Language (default: de)
- `categories` - Search categories (default: general)
- `safesearch` - Safe search (default: 0)

## File Structure

```
searxng-setup/
├── docker-compose.yml
├── server.js
└── README.md
```

That's it! 🚀