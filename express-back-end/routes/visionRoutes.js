require('dotenv').config( {path: '../.env'} );
const express = require('express');
const router = express.Router();
const axios = require('axios');
const vision = require('@google-cloud/vision');
const credentials = require('../visionAI/googleAPIkey.json');
const fs = require('fs');
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'visionAI/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

const upload = multer({ storage: storage })

router.post('/upload', upload.single('file'), async (req, res) => {

  const fileName = (res.req.file.filename);

  const options = {
    credentials: credentials,
    projectId: 'lighthouse-final'
  };

  const client = new vision.ImageAnnotatorClient(options);

  const [result] = await client.objectLocalization(`/home/ralphunrau/lighthouse/product-ranker/express-back-end/visionAI/images/${fileName}`);
  const objects = result.localizedObjectAnnotations;

  console.log(objects[0].name)
  res.send({object: objects[0].name});
})


module.exports = router;