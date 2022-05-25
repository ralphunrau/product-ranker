require('dotenv').config( {path: '../.env'} );
const express = require('express');
const router = express.Router();
const axios = require('axios');
const vision = require('@google-cloud/vision');
const credentials = require('../googleAPIkey.json');
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

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), async (req, res) => {

  const fileName = (res.req.file.filename);

  const options = {
    credentials: credentials,
    projectId: 'lighthouse-final'
  };

  const client = new vision.ImageAnnotatorClient(options);

  const [result1] = await client.objectLocalization(`${process.env.FILE_PATH}${fileName}`)
  const [result2] = await client.logoDetection(`${process.env.FILE_PATH}${fileName}`);

  const concatSearch = result1.localizedObjectAnnotations[0].name + ' ' + (result2.logoAnnotations[0]?.description || '');

  res.send({object: concatSearch});
});


module.exports = router;