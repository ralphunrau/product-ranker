const knex = require('./knex');

const getUserByEmail = (emailinput) => {
  return knex('users')
    .where({ email: emailinput })
    .then((res) => res[0])
    .catch(e => console.log(e.message));
};

const registerUser = (user) => {
  const newUser = {
    email: user.email,
    username: user.username,
    password: user.password
  }
  return knex('users')
    .insert({...newUser})
    .then(() => newUser)
    .catch(e => console.log(e.message));
};

const getProductById = (productId) => {
  return knex('products')
    .where({ id: productId })
    .then((res) => res[0])
    .catch(e => console.log(e.message));
};

const saveProduct = (product) => {

  return knex('products')
    .insert({...product})
    .then(() => product)
    .catch(e => console.log(e.message));
};

const updateProduct = (product) => {
  return knex('products')
    .where({ id: product.id })
    .update({...product})
    .then(() => product)
    .catch(e => console.log(e.message));
};

const updateWish = (product) => {
  return knex('wishes')
    .where({ id: product.id })
    .update({position: product.position})
    .then(() => product)
    .catch(e => console.log(e.message));
};

const addWish = (userId, productId) => {
  const newWish = {
    user_id: userId,
    product_id: productId
  };

  return knex('wishes')
    .insert({...newWish})
    .then(() => newWish)
    .catch(e => console.log(e.message));
};

const getWish = (user) =>  {
  return knex('products')
    .leftJoin('wishes', { 'products.id': 'wishes.product_id' })
    .select().table('products')
    .where({ 'wishes.user_id':  user })
    .orderBy('position', 'asc')
    .then((res) => res)
};

const removeWish = (user, product) => {
  return knex('wishes')
    .where({ user_id: user, product_id: product})
    .del();
};

module.exports = {
  getUserByEmail,
  registerUser,
  getProductById,
  saveProduct,
  addWish,
  getWish,
  updateProduct,
  removeWish,
  updateWish
};