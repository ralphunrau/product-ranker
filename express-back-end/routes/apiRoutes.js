const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const axios = require('axios');

router.get('/data', (req, res) => {

  const options = {
    method: 'GET',
    url: 'https://amazon-product-reviews-keywords.p.rapidapi.com/product/search',
    params: {keyword: 'phone', country: 'US', category: 'aps'},
    headers: {
      'X-RapidAPI-Host': 'amazon-product-reviews-keywords.p.rapidapi.com',
      'X-RapidAPI-Key': '67d33be7eemsh31da64a18d64453p1ef428jsnbf5c166c363a'
    }
  };
  
  axios.request(options).then((req, res) => {
    console.log(response.data);
  }).catch((err) => {
    console.error(err);
  });
});

module.exports = router;