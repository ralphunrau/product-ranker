import './styles/App.scss';
import axios from 'axios';
import Header from './Header';
import Body from './Body';


import useApplicationData from '../hooks/useApplicationData';

export default function App(props) {

  const { state , setCategory } = useApplicationData();

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
      <Header mode={state.header}/>
      <Body
        currentCategory={state.currentCategory}
        category={state.category}
        categories={state.categories}
        onChange={setCategory}
        products={state.products}
      />
    </div>
  );
}