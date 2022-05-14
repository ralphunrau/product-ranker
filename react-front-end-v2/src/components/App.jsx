import './styles/App.scss';
import axios from 'axios';

export default function App(props) {
  const fetchProducts = () => {
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

  const fetchCategories = () => {
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

  return (
    <div className="App">
      <h1>{ props.message }</h1>
      <button onClick={fetchCategories} >
        Fetch Data
      </button>        
    </div>
  );
}