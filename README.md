# SearXNG with API Limiter

Simple setup for SearXNG with an API proxy that allows limiting search results.

## Why Use This?

**Problem**: SearXNG returns 20 results per page by default, but AI agents and workflows typically only need the top 3-5 most relevant results. Processing all 20 results wastes API credits and tokens.

**Solution**: This proxy adds a `result_limit` parameter to control exactly how many results you get, perfect for AI workflows where you want to minimize token usage and API costs.

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

- **SearXNG**: http://localhost:8888 (returns 20 results per page)
- **Limited API**: http://localhost:3100 (configurable result limit)

## API Usage

```bash
# Standard SearXNG API (20 results per page)
curl "http://localhost:8888/search?q=test&format=json"

# Limited API (default: 3 results, configurable)
curl "http://localhost:3100/search?q=test&result_limit=5"

# Perfect for AI agents (only top 3 results)
curl "http://localhost:3100/search?q=test&result_limit=3"
```

## API Parameters

This tool supports all standard SearXNG API parameters **plus** the additional `result_limit` enhancement:

- `q` - Search query (required)
- `result_limit` - **NEW**: Number of results (default: 3, saves API credits!)
- `language` - Language (default: de)
- `categories` - Search categories (default: general)
- `safesearch` - Safe search (default: 0)
- `pageno` - Page number (default: 1)
- `format` - Response format (default: json)

For complete API documentation and all available parameters, refer to the official SearXNG API documentation:  
**📖 https://docs.searxng.org/dev/search_api.html**

*This code is just an enhancement that adds the `result_limit` parameter to the standard SearXNG API.*

## AI Workflow Benefits

- **💰 Save Credits**: Only process relevant results, not all 20
- **🚀 Faster Processing**: Less data to parse and analyze
- **🎯 Better Focus**: Top results are usually most relevant anyway
- **📊 Predictable Costs**: Know exactly how many results you're paying for

## File Structure

```
searxng-setup/
├── docker-compose.yml
├── server.js
└── README.md
```

Perfect for n8n, LangChain, AutoGPT, and other AI automation tools! 🚀
