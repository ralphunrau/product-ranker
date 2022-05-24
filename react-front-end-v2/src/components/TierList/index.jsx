import { useState } from 'react';
import HorizontalTabs from "./HorizontalTabs";
import ImageSubmitForm from './ImageSubmitForm';
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';


import useVisualMode from "../../hooks/useVisualMode";

import {HIDDEN, SHOW} from '../../helper/modes';

const sortProducts = (products) => {
  const filteredProducts = products.filter((product) => {
    return product.rating != null;
  })
  return filteredProducts.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
};

export default function TierList(props) {

  const {mode, transition, back} = useVisualMode(HIDDEN);

  const toggleImageForm = () => {
    mode === HIDDEN ? transition(SHOW) : back();
  };

  const handleClickAway = () => {
    transition(HIDDEN);
  };

  const getCategoryName = () => {
    if (props.searchTerm) {
      return props.searchTerm;
    }

    if (props.category) {
      if (props.childCategory) return props.childCategories.find(category => category.id === props.childCategory)?.name;
      return props.categories.find(category => category.id === props.category).name;
    }
    return 'CATEGORY';
  };

  return (
    <div className="tier-list">
      <section className="tier-list-body">
        <div className="tier-list-item">
          <div className="tier-list-rank">
            <img src='s.png' alt='s-rank'/>
          </div>
          <HorizontalTabs
            products={sortProducts(props.products).slice(0, (props.products.length) / 6)}
            user={props.user}
            addWish={props.addWish}
            removeWish={props.removeWish}
            wishes={props.wishes}
            getReviewsByAsin={props.getReviewsByAsin}
            reviews={props.reviews}
          />
        </div>
        <div className="tier-list-item">
          <div className="tier-list-rank">
          <img src='a.png' alt='a-rank'/>
          </div>
          <HorizontalTabs  
            products={sortProducts(props.products).slice((props.products.length) / 6, (props.products.length) / 6 * 2)}
            user={props.user}
            addWish={props.addWish}
            removeWish={props.removeWish}
            wishes={props.wishes}
            getReviewsByAsin={props.getReviewsByAsin}
            reviews={props.reviews}
          />      
        </div>
        <div className="tier-list-item">
          <div className="tier-list-rank">
            <img src='b.png' alt='b-rank'/>
          </div>
          <HorizontalTabs
            products={sortProducts(props.products).slice((props.products.length) / 6 * 2, (props.products.length) / 6 * 3)}
            user={props.user}
            addWish={props.addWish}
            removeWish={props.removeWish}
            wishes={props.wishes}
            getReviewsByAsin={props.getReviewsByAsin}
            reviews={props.reviews}    
          />
        </div>
        <div className="tier-list-item">
          <div className="tier-list-rank">
            <img src='c.png' alt='c-rank'/>
          </div>
          <HorizontalTabs    
            products={sortProducts(props.products).slice((props.products.length) / 6 * 3, (props.products.length) / 6 * 4)}
            user={props.user}
            addWish={props.addWish}
            removeWish={props.removeWish}
            wishes={props.wishes}
            getReviewsByAsin={props.getReviewsByAsin}
            reviews={props.reviews}            
          />
        </div>
        <div className="tier-list-item">
          <div className="tier-list-rank">
            <img src='d.png' alt='d-rank'/>
          </div>
          <HorizontalTabs    
            products={sortProducts(props.products).slice((props.products.length) / 6 * 4, (props.products.length) / 6 * 5)}
            user={props.user}
            addWish={props.addWish}
            removeWish={props.removeWish}
            wishes={props.wishes}
            getReviewsByAsin={props.getReviewsByAsin}
            reviews={props.reviews}            
          />
        </div>
        <div className="tier-list-item">
          <div className="tier-list-rank">
            <img src='f.png' alt='f-rank'/>
          </div>
          <HorizontalTabs    
            products={sortProducts(props.products).slice((props.products.length) / 6 * 5, -1)}
            user={props.user}
            addWish={props.addWish}
            removeWish={props.removeWish}
            wishes={props.wishes}
            getReviewsByAsin={props.getReviewsByAsin}
            reviews={props.reviews}           
          />
        </div>
      </section>
      <footer className="tier-list-footer">
        {mode === HIDDEN && <BackupRoundedIcon 
          onClick={() => toggleImageForm()}
        />}
        {mode === SHOW && (       
          <ImageSubmitForm
            onClick={() => toggleImageForm()}
            getProductsByImageLabel={props.getProductsByImageLabel}
            setSearch={props.setSearch}
            handleClickAway={handleClickAway}
          />
        )}       
      </footer>
    </div>
  );
};