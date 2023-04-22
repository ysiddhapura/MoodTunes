const btoa = require('btoa');
const dotenv = require("dotenv");

const client_id = 'your_client_id';
const client_secret = 'your_client_secret';

let accessTokenCache = {
  value: null,
  expiresAt: null
};

const getAccessToken = async () => {
    console.log(accessTokenCache.expiresAt)
  if (accessTokenCache.value && Date.now() < accessTokenCache.expiresAt) {
    return accessTokenCache.value;
  }

  const credentials = `${process.env.CLIENT_ID}:${process.env.CLIENT_SEC}`;
  const encoded_credentials = btoa(credentials);

  const url = 'https://accounts.spotify.com/api/token';
  const headers = {
    'Authorization': `Basic ${encoded_credentials}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  const data = new URLSearchParams();
  data.append('grant_type', 'client_credentials');

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: data
  });

  if (response.ok) {
    const token_data = await response.json();
    accessTokenCache.value = token_data.access_token;
    accessTokenCache.expiresAt = Date.now() + (token_data.expires_in - 60) * 1000; // Subtracting 60 seconds to account for network latency
    console.log(accessTokenCache)
    return accessTokenCache.value;
  } else {
    throw new Error(`Error: ${response.status}`);
  }
};

module.exports = getAccessToken;