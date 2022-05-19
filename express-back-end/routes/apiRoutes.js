require('dotenv').config( {path: '../.env'} );
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const axios = require('axios');
const vision = require('@google-cloud/vision');
const credentials = require('../visionAI/googleAPIkey.json');

// Get all products
router.get('/products', (req, res) => {

  // set up the request parameters
  const params = {
    api_key: process.env.API_KEY,
    type: "search",
    amazon_domain: "amazon.com",
    search_term: 'search'
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

// Get products with a specific search term
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
      res.json(response.data.search_results);
      
    }).catch(error => {
      // catch and print the error
      console.log(error);
    })
    
})



// Get category items within a certain category
router.get('/products/categories/:category', (req, res) => {

  // set up the request parameters
  const params = {
    api_key: process.env.API_KEY,
    type: "category",
    category_id: req.params.category,
    amazon_domain: "amazon.com"
  }

  // make the http GET request to Rainforest API
  axios.get('https://api.rainforestapi.com/request', { params })
    .then(response => {

      // print the JSON response from Rainforest API
      res.json(response.data.category_results);

    }).catch(error => {
      // catch and print the error
      console.log(error);
    })
      
})

// Get all categories
router.get('/categories', (req, res) => {

  // make the http GET request to Rainforest API
  axios.get(`https://api.rainforestapi.com/categories?api_key=${process.env.API_KEY}&domain=amazon.com`)
    .then(response => {

      // print the JSON response from Rainforest API
      res.send(response.data.categories);

    }).catch(error => {
      // catch and print the error
      console.log(error);
    }); 
});

router.get('/categories/:categoryId' , (req, res) => {

  // make the http GET request to Rainforest API
  axios.get(`https://api.rainforestapi.com/categories?api_key=${process.env.API_KEY}&parent_id=${req.params.categoryId}&domain=amazon.com`)
  .then(response => {

    // print the JSON response from Rainforest API
    res.send(response.data.categories);

  }).catch(error => {
    // catch and print the error
    console.log(error);
  }); 

})

router.get('/products/:category/:searchTerm', (req, res) => {

  // set up the request parameters
  const params = {
    api_key: process.env.API_KEY,
    type: "search",
    category_id: req.params.category,
    amazon_domain: "amazon.com",
    search_term: req.params.searchTerm
  }
  
  // make the http GET request to Rainforest API
  axios.get('https://api.rainforestapi.com/request', { params })
    .then(response => {

      // print the JSON response from Rainforest API
      res.json(response.data.search_results);
      
    }).catch(error => {
      // catch and print the error
      console.log(error);
    })
    
})

router.get('/vision'), (req, res) => {
  console.log('im here')
  // // Initializes authentication
  // const options = {
  //   credentials: credentials,
  //   projectId: 'lighthouse-final'
  // };

  // // Creates a client
  // const client = new vision.ImageAnnotatorClient(options);

  // // Performs label detection on the image file
  // const [result] = client.labelDetection('../visionAI/images/googleVision1.jpg');
  // const labels = result.labelAnnotations;

  // console.log(labels);
  // res.send(labels);
}



module.exports = router;