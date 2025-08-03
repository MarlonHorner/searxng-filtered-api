const express = require('express');
const axios = require('axios');

const app = express();
const SEARXNG_URL = process.env.SEARXNG_URL || 'http://searxng:8080';

app.get('/search', async (req, res) => {
  console.log('[INCOMING REQUEST]', req.url);
  
  const {
    q,
    format = 'json',
    categories = 'general',
    language = 'de',
    safesearch = '0',
    pageno = '1',
    result_limit = 3
  } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Missing query parameter "q"' });
  }

  try {
    const response = await axios.get(`${SEARXNG_URL}/search`, {
      params: {
        q,
        format,
        categories,
        language,
        safesearch,
        pageno
      },
      headers: {
        'User-Agent': 'searxng-proxy-agent'
      }
    });

    const fullResults = response.data.results || [];
    const limitedResults = fullResults.slice(0, parseInt(result_limit));

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
      query: q,
      total_results: fullResults.length,
      returned: limitedResults.length,
      results: limitedResults
    });

  } catch (err) {
    console.error('Error fetching from SearXNG:', err.message);
    res.status(500).json({ 
      error: 'Internal Proxy Error', 
      details: err.message 
    });
  }
});

app.listen(3100, () => {
  console.log('SearXNG API Proxy running on port 3100');
});