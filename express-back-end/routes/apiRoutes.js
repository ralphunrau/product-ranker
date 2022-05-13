const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const axios = require('axios');

router.get('/products', (req, res) => {

  // set up the request parameters
  const params = {
    api_key: "101C667FB8784490A24C4AE9E2F6E050",
    type: "search",
    amazon_domain: "amazon.ca",
    search_term: "phone"
  }
  
  // make the http GET request to Rainforest API
  axios.get('https://api.rainforestapi.com/request', { params })
    .then(response => {
      
      // console result


      // print the JSON response from Rainforest API
      res.send(response);
  
    }).catch(error => {
      // catch and print the error
      console.log(error);
    })
    
})

router.get('/categories', (req, res) => {

  // set up the request parameters
  const params = {
    api_key: "101C667FB8784490A24C4AE9E2F6E050",
    type: "category",
    url: "https://www.amazon.com/s?bbn=16225009011&rh=n%3A%2116225009011%2Cn%3A502394%2Cn%3A281052",
    amazon_domain: "amazon.ca",
    category_id: "1000"
  }

  // make the http GET request to Rainforest API
  axios.get('https://api.rainforestapi.com/request', { params })
    .then(response => {

      // print the JSON response from Rainforest API
      console.log('categories response.data:', JSON.stringify(response.data, 0, 2));

    }).catch(error => {
      // catch and print the error
      console.log(error);
    })
    
})

module.exports = router;