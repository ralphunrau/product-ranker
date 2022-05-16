import './styles/App.scss';
import axios from 'axios';
import Header from './Header';
import Body from './Body';


import useApplicationData from '../hooks/useApplicationData';

export default function App(props) {

  const { state , setCategory, getChildCategories } = useApplicationData();

  const setMainCategory = (category) => {
    setCategory(category);
    getChildCategories(category);
  }

  return (
    <div className="App">
      <Header mode={state.header}/>
      <Body
        category={state.category}
        categories={state.categories}
        childCategories={state.childCategories}
        childCategory={state.childCategory}
        onChange={setMainCategory}
        products={state.products}
      />
    </div>
  );
}