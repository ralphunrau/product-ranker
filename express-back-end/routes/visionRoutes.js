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

  const [result] = await client.objectLocalization(`${process.env.FILE_PATH}${fileName}`);
  const objects = result.localizedObjectAnnotations;
  res.send({object: objects[0].name});
});


module.exports = router;