import './styles/App.scss';
import axios from 'axios';
import Header from './Header';
import Body from './Body';


import useApplicationData from '../hooks/useApplicationData';

export default function App(props) {

  const { state , setMainCategory, selectCategory } = useApplicationData();
  
  return (
    <div className="App">
      <Header mode={state.header}/>
      <Body
        category={state.category}
        categories={state.categories}
        childCategories={state.childCategories}
        childCategory={state.childCategory}
        setMainCategory={setMainCategory}
        selectCategory={selectCategory}
        products={state.products}
      />
    </div>
  );
}