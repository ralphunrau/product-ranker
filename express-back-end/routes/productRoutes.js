const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

const { getProductById, saveProduct, updateProduct, removeWish, addWish, getWish } = require('../db/db');

router.get('/wishes/:id', (req, res) => {
  getWish(req.params.id)
    .then(products => res.send(products))
    .catch(error => console.error(error));
})

router.post('/wishes/:id', (req, res) => {

  const product = {
    id: req.body.id,
    image: req.body.image,
    link: req.body.link,
    title: req.body.title,
    price: req.body.price,
    rating: Number(req.body.rating),
    ratings_total: Number(req.body.ratings_total)
  }
    
  getProductById(product.id)
    .then((response) => {

      if(!response) {
        saveProduct(product)
          .then(() => console.log(`New product ${product.id} saved in database`));
      } else {
        updateProduct(product)
          .then(() => console.log(`Product ${product.id} information updated`));
      }

      getWish(req.params.id)
        .then((wishes) => {
          if(!wishes.find((wish) => wish.product_id === product.id)) {
            addWish(req.params.id, product.id)
              .then((response) =>  {
                console.log(`User ${req.params.id} wishes for product ${product.id}`)
                res.send(response);
                return;
              })
          }
          res.sendStatus(403);
        })
      })
      .catch(error => console.error(error));
})

router.post('/remove/:user/:product', (req, res) => {
  const user = req.params.user;
  const product = req.params.product;

  removeWish(user, product)
    .then(() => {
      console.log(`Product ${product} removed from user ${user} wish`);
      res.sendStatus(200);
      return;
    })
    .catch(error => console.error(error));
});

module.exports = router;