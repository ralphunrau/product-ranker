import React, { Component } from 'react';
import axios from 'axios';
import './styles/App.scss';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Click the button to load data!',
      products: []
    }
  }

  fetchProducts = () => {
    axios.get('/api/products') // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      console.log(response.data) // The entire response from the Rails API

      console.log(response.data.message) // Just the message
      this.setState({
        message: response.data.message,
        products: response.data
      });
    }) 
  }

  fetchCategories = () => {
    axios.get('/api/categories') // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      console.log(response.data) // The entire response from the Rails API

      console.log(response.data.message) // Just the message
      this.setState({
        message: response.data.message
      });
    }) 
  }

  createProducts = (products) => {
    return products.map((product) => {
      // console.log(product.price.raw)
      return (
        <Product
          id={product.asin}
          title={product.title}
          link={product.link}
          image={product.image}
          rating={product.rating}
          ratings_total={product.ratings_total}
          price={product.price.raw}
        />
      )
    })
  }


  render() {
    return (
      <div className="App">
        <h1>{ this.state.message }</h1>
        <button onClick={this.fetchProducts} >
          Fetch Data
        </button>
        <div>
          {this.state.products[0] ? this.createProducts(this.state.products) : 'The data will be here upon fetch.'}
        </div>
      </div>
    );
  }
}

export default App;

