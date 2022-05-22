import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

import TabPanel from './TabPanel';
import ProductPanel from './ProductPanel';

import '../styles/HorizontalTabs.scss';

import useVisualMode from '../../hooks/useVisualMode';

import {HORIZONTAL, VERTICAL} from '../../helper/modes';

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {id: `horizontal-tab-${index}`, 'aria-controls': `horizontal-tabpanel-${index}`};
}

export default function HorizontalTabs(props) {

  const [value, setValue] = useState(false);

  const {mode, transition, back} = useVisualMode(HORIZONTAL);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    transition(HORIZONTAL);
  };

  const toggleShow = () => {
      mode === HORIZONTAL ? transition(VERTICAL) : back();
  };

  const items = props.products.map((item, index) => <Tab id={`horizontal-tab-${index}`} key={`horizontal-tab-${index}`} label={<img src={item.image} alt="product"></img>} {...a11yProps(index)} />);

  const itemsPanels = props.products.map((product, index) => {
    return (      
      <ProductPanel
        id={`panel-${index}`}
        key={`panel-${index}`}
        index={index}
        value={value}
        product={product}
        addWish={props.addWish}
        getReviewByAsin={props.getReviewByAsin}
        user={props.user}
        toggleShow={toggleShow}
      />
    ) 
  });

  return (
    <section className='tier-list-row'>
        <div className='horizontal-tab'>          
          <div className="horizontal-tab-top">
            <Box sx={{ maxWidth: { xs: 320, sm: 1500 }, bgcolor: 'background.paper' }}>
              <Tabs
                id={`horizontal-${value}`}
                key={`horizontal-${value}`}
                value={value}
                onChange={handleChange}
                onClick={toggleShow}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="scrollable force tabs example"
              >
              {items}
              </Tabs>              
            </Box>
          </div>
          {mode === HORIZONTAL && <></>}
          {mode === VERTICAL && (
            <div className="horizontal-tab-bottom">
              {itemsPanels}
            </div>
            )}
        </div>
    </ section>
  )
}
