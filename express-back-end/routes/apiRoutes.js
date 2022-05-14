require('dotenv').config( {path: '../.env'} );
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const axios = require('axios');

router.get('/products', (req, res) => {

  // set up the request parameters
  const params = {
    api_key: process.env.API_KEY,
    type: "search",
    amazon_domain: "amazon.com",
    search_term: search
  }
  
  // make the http GET request to Rainforest API
  axios.get('https://api.rainforestapi.com/request', { params })
    .then(response => {

      // print the JSON response from Rainforest API
      res.send(response.data.search_results);
  
    }).catch(error => {
      // catch and print the error
      console.log(error);
    })
    
})

router.get('/products/:searchTerm', (req, res) => {

  // set up the request parameters
  const params = {
    api_key: process.env.API_KEY,
    type: "search",
    amazon_domain: "amazon.com",
    search_term: req.params.searchTerm
  }
  
  // make the http GET request to Rainforest API
  axios.get('https://api.rainforestapi.com/request', { params })
    .then(response => {

      // print the JSON response from Rainforest API
      res.send(response.data.search_results);
  
    }).catch(error => {
      // catch and print the error
      console.log(error);
    })
    
})

router.get('/categories', (req, res) => {

  // set up the request parameters
  const params = {
    api_key: process.env.API_KEY,
    type: "standard",
  }

  // make the http GET request to Rainforest API
  axios.get(`https://api.rainforestapi.com/categories?api_key=${process.env.API_KEY}&domain=amazon.com`)
    .then(response => {

      // print the JSON response from Rainforest API
      res.send(response.data);

    }).catch(error => {
      // catch and print the error
      console.log(error);
    })
    
})

module.exports = router;