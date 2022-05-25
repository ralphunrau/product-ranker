import { useState } from 'react';
import ImageSubmitForm from '../TierList/ImageSubmitForm';
import '../styles/HomePage.scss';
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';

import useVisualMode from "../../hooks/useVisualMode";

import {HIDDEN, SHOW} from '../../helper/modes';

export default function HomePage(props) {

  const {mode, transition, back} = useVisualMode(HIDDEN);

  const toggleImageForm = () => {
    mode === HIDDEN ? transition(SHOW) : back();
  };

  const handleClickAway = () => {
    transition(HIDDEN);
  };

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
    </div>
  );
};