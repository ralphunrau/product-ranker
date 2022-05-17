import './styles/App.scss';
import Header from './Header';
import Body from './Body';

import useApplicationData from '../hooks/useApplicationData';

export default function App(props) {

  const { state , setMainCategory, selectCategory, setSearchTerm, getProductsByCategory, changeCurrentItem } = useApplicationData();
  
  return (
    <div className="App">
      <Header mode={state.header} setSearch={setSearchTerm} />
      <Body
        category={state.category}
        categories={state.categories}
        childCategories={state.childCategories}
        childCategory={state.childCategory}
        setMainCategory={setMainCategory}
        selectCategory={selectCategory}
        products={state.products}
        getProductsByCategory={getProductsByCategory}
        changeCurrentItem={changeCurrentItem}
        currentItem={state.currentItem}
      />
    </div>
  );
}