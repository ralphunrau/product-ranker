import '../styles/TierList.scss';
import Item from './Item';
import VerticalTabs from './VerticalTabs';
import * as React from 'react';
import { faBorderNone } from '@fortawesome/free-solid-svg-icons';

export default function TierList(props) {
  // const {mode, transition, back} = useVisualMode(HIDDEN);
  // const [shown, setShown] = React.useState(false);

  const sortProducts = (products) => {
    return products.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
  }

  const allProductsToComponents = sortProducts(props.products).map((product) => {
    return (
      <Item 
      image={product.image}
      key={product.asin}
      id={product.asin}
      link={product.link}
      rating={product.rating}
      ratings_total={product.ratings_total}
      title={product.title}
      />
    )
  })

  const getCategoryName = () => {
    if (props.category) {
      if (props.childCategory) return props.childCategories.find(category => category.id === props.childCategory).name;
      return props.categories.find(category => category.id === props.category).name;
    }
    return 'CATEGORY';
  }

  const sortItemsIntoTierList = (allProducts) => {

    const amountOfProducts = allProducts.length;

    return (
      <div id="tier-list-right">
        <div className="tier-list-item">
          {allProducts.slice(0, amountOfProducts / 6)}
        </div>
        <div className="tier-list-item">
          {allProducts.slice(amountOfProducts / 6 , (amountOfProducts / 6) * 2)}
        </div>
        <div className="tier-list-item">
          {allProducts.slice((amountOfProducts / 6) * 2 , (amountOfProducts / 6) * 3)}
        </div>
        <div className="tier-list-item">
          {allProducts.slice((amountOfProducts / 6) * 3 , (amountOfProducts / 6) * 4)}
        </div>
        <div className="tier-list-item">
          {allProducts.slice((amountOfProducts / 6) * 4 , (amountOfProducts / 6) * 5)}
        </div>
        <div className="tier-list-item">
          {allProducts.slice((amountOfProducts / 6) * 5 , -1)}
        </div>
      </div>
    )
  };

  const toggleShow = (id, secondId) => {
    document.getElementById(id).style.display !== "none" ? document.getElementById(id).style.display = "none" : document.getElementById(id).style.display = "block";
    document.getElementById(secondId).style.display !== "none" ? document.getElementById(secondId).style.display = "none" : document.getElementById(secondId).style.display = "block";
  }

  return (
    <div id="tier-list">
      <header>
        {getCategoryName()}
      </header>
      <div id="tier-list-body">
        <div id="tier-list-left">
          <div className="tier-list-rank">
            <img id="first-rank" src='s-badge.png' alt='s-badge' onClick={() => toggleShow("first-rank", "first-tab")}/>
            <VerticalTabs
              id="first-tab"
              products={sortProducts(props.products.slice(0, (props.products.length) / 6))}
              toggleShow={() => toggleShow("first-rank", "first-tab")}
            />
          </div>
          <div className="tier-list-rank">
            <img id="second-rank" src='a-badge.png' alt='a-badge' onClick={() => toggleShow("second-rank", "second-tab")}/>
              <VerticalTabs
              id="second-tab"
              products={sortProducts(props.products.slice((props.products.length) / 6, (props.products.length) / 6 * 2))}
              toggleShow={() => toggleShow("second-rank", "second-tab")}
            />
          </div>
          <div className="tier-list-rank">
            <img id="third-rank" src='b-badge.png' alt='b-badge' onClick={() => toggleShow("third-rank", "third-tab")}/>
            <VerticalTabs
              id="third-tab"
              products={sortProducts(props.products.slice((props.products.length) / 6 * 2, (props.products.length) / 6 * 3))}
            />
          </div>
          <div className="tier-list-rank">
            <img id="fourth-rank" src='c-badge.png' alt='c-badge' onClick={() => toggleShow("fourth-rank", "fourth-tab")}/>
            <VerticalTabs
              id="fourth-tab"
              products={sortProducts(props.products.slice((props.products.length) / 6 * 3, (props.products.length) / 6 * 4))}
            />
          </div>
          <div className="tier-list-rank">
            <img id="fifth-rank" src='d-badge.png' alt='d-badge' onClick={() => toggleShow("fifth-rank", "fifth-tab")}/>
            <VerticalTabs
              id="fifth-tab"
              products={sortProducts(props.products.slice((props.products.length) / 6 * 4, (props.products.length) / 6 * 5))}
            />
          </div>
          <div className="tier-list-rank">
            <img id="sixth-rank" src='f-badge.png' alt='f-badge' onClick={() => toggleShow("sixth-rank", "sixth-tab")}/>
            <VerticalTabs
              id="sixth-tab"
              products={sortProducts(props.products.slice((props.products.length) / 6 * 5, -1))}
            />
          </div>
        </div>
        {sortItemsIntoTierList(allProductsToComponents)}
      </div>
      <div id="tier-list-footer">
        <button>
          Add item to favorites
        </button>
        <button>
          Compare items on this tier list
        </button>
      </div>

    </div>
  )
}