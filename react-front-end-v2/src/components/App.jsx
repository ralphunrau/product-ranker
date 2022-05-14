import './styles/App.scss';
import axios from 'axios';
import Nav from './Nav';
import Header from './Header';
import TierList from './TierList'

import useApplicationData from '../hooks/useApplicationData';

export default function App(props) {

  const {state, setHeader, user } = useApplicationData();

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

  // const fetchCategories = () => {
  //   axios.get('/api/categories') // You can simply make your requests to "/api/whatever you want"
  //   .then((response) => {
  //     // handle success
  //     console.log(response.data) // The entire response from the Rails API

  //     console.log(response.data.message) // Just the message
  //     this.setState({
  //       message: response.data.message
  //     });
  //   }) 
  // }

  return (
    <div className="App">
      <Nav user={user} toggleForm={setHeader} header={state.header} />
      <Header mode={state.header}/>
      <h1>{ props.message }</h1>
      <button onClick={fetchProducts} >
        Fetch Data
      </button>
      <TierList />
    </div>
  );
}