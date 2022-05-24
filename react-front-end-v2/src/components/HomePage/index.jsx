import { useState } from 'react';
import ImageSubmitForm from '../TierList/ImageSubmitForm';
import '../styles/HomePage.scss';

export default function HomePage(props) {

  return (
    <div className="home-page">
      <div className="home-page-text">
        <h1>
          Welcome to Amazonia!
        </h1>
        <p>
          Submit an image in the dropbox below to explore similar products
        </p>
      </div>
      <ImageSubmitForm 
        getProductsByImageLabel={props.getProductsByImageLabel}
        setSearch={props.setSearch}
      />
    </div>
  );
};