import { useState } from 'react';
import HorizontalTabs from "./HorizontalTabs";
import ImageSubmitForm from './ImageSubmitForm';
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';


import useVisualMode from "../../hooks/useVisualMode";

import {HIDDEN, SHOW} from '../../helper/modes';

const sortProducts = (products) => {
  const output = {
    sRank: [],
    aRank: [],
    bRank: [],
    cRank: [],
    dRank: [],
    fRank: [],
  };
  
  const filteredProducts = products.filter((product) => {
    return product.rating != null;
  });

  filteredProducts.forEach((product) => {
    if (product.rating >= 4.7 && product.ratings_total >= 1000) {
      output['sRank'].push(product);
    } else if ((product.rating >= 4.4) && (product.ratings_total >= 300 )) {
      output['aRank'].push(product);
    } else if ((product.rating >= 4) && (product.ratings_total >= 200 )) {
      output['bRank'].push(product);
    } else if ((product.rating >= 3.7) && (product.ratings_total >= 100 )) {
      output['cRank'].push(product);
    } else if ((product.rating >= 3.5) && (product.ratings_total >= 50 )) {
      output['dRank'].push(product);
    } else {
      output['fRank'].push(product);
    }
  });

  return output;
};


export default function TierList(props) {

  const {mode, transition, back} = useVisualMode(HIDDEN);

  const sortedProducts = sortProducts(props.products);

  const toggleImageForm = () => {
    mode === HIDDEN ? transition(SHOW) : back();
  };

  const handleClickAway = () => {
    transition(HIDDEN);
  };

  return (
    <div className="tier-list">
      <section className="tier-list-body">
        <div className="tier-list-item">
          <div className="tier-list-rank">
            <img src='s.png' alt='s-rank'/>
          </div>
          <HorizontalTabs
            products={sortedProducts.sRank}
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
            products={sortedProducts.aRank}
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
            products={sortedProducts.bRank}
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
            products={sortedProducts.cRank}
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
            products={sortedProducts.dRank}
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
            products={sortedProducts.fRank}
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