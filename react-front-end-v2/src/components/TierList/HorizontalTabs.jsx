import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';


import TabPanel from './TabPanel';
import ReviewsPanel from './ReviewsPanel';
import Label from './Label';
import Status from '../Status';

import '../styles/HorizontalTabs.scss';

import useVisualMode from '../../hooks/useVisualMode';

import {HIDDEN, SHOW} from '../../helper/modes';

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '25%',
  maxHeight: '60%',
  bgcolor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '5px',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function a11yProps(index) {
  return {id: `horizontal-tab-${index}`, 'aria-controls': `horizontal-tabpanel-${index}`};
}

export default function HorizontalTabs(props) {

  console.log(props.reviews)

  const [value, setValue] = useState(false);

  const {mode, transition} = useVisualMode(HIDDEN);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShow = (asin) => {
    mode === SHOW ? transition(HIDDEN) : transition(SHOW);
    props.getReviewsByAsin(asin);
  };



  const itemsPanels = props.products.map((product, index) => {
    const productItem = {...product, title: (product.title.split(',')[0]).split(' ').slice(0, 10).join(' ').split('-')[0]};
    return (      
      <ReviewsPanel
        id={`panel-${index}`}
        key={`panel-${index}`}
        index={index}
        value={value}
        reviews={props.reviews.slice(0)}
        product={productItem}
        addWish={props.addWish}
        removeWish={props.removeWish}
        wishes={props.wishes}
        getReviewByAsin={props.getReviewByAsin}
        user={props.user}
      />
    ) 
  });

  const items = props.products.map((item, index) => (    
    <Tab 
      id={`horizontal-tab-${index}`} 
      key={`horizontal-tab-${index}`}
      {...a11yProps(index)}
      onClick={()=> toggleShow(item.asin)} 
      label={(
        <Label
          key={`item-${index}`}
          id={`item-${index}`}
          product={item}
          value={value}
          wishes={props.wishes}
        />
      )}
    />
  ));

  return (
    <section className='tier-list-row'>
        <div className='horizontal-tab'>
          <div className="horizontal-tab-top">
            <Box sx={{ bgcolor: 'background.paper' }}>              
              <Tabs
                id={`horizontal-${value}`}
                key={`horizontal-${value}`}
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="scrollable force tabs example"
              >              
              {items}
              </Tabs>              
            </Box>
          </div>
          <Modal
            open={mode === SHOW}
            onClose={toggleShow}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >            
            <div className="product-modal">
                <Box sx={style}>
                  {itemsPanels}
                </Box>
              </div>          
          </Modal>
        </div>
    </ section>
  )
}
