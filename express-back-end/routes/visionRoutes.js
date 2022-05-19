require('dotenv').config( {path: '../.env'} );
const express = require('express');
const router = express.Router();
const axios = require('axios');
const vision = require('@google-cloud/vision');
const credentials = require('../visionAI/googleAPIkey.json');

router.get('', async (req, res) => {

  const options = {
    credentials: credentials,
    projectId: 'lighthouse-final'
  };

  const client = new vision.ImageAnnotatorClient(options);

  const [result] = await client.labelDetection('/home/ralphunrau/lighthouse/product-ranker/express-back-end/visionAI/images/googleVision1.jpg');
  const labels = result.labelAnnotations;
  console.log(result);

  res.send(result);
})


module.exports = router;