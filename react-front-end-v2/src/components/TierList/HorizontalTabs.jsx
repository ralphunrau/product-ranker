import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import VerticalTabs from './VerticalTabs';

import useVisualMode from '../../hooks/useVisualMode';

import {HORIZONTAL, VERTICAL} from '../../helper/modes';

export default function HorizontalTabs(props) {

  const [value, setValue] = useState(0);

  const {mode, transition, back} = useVisualMode(HORIZONTAL);

  const items = props.products.map((item) => <Tab key={item.asin} label={<img src={item.image} alt="product"></img>} />);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShow = () => {
    mode === HORIZONTAL ? transition(VERTICAL) : back();
  };

  return (
    <section className='tier-list-row'>
      {mode === HORIZONTAL && (
        <>
          <div className="tier-list-left">
            <img src='a-badge'alt='rank-badge' onClick={() => toggleShow()} />
          </div>
          <div className="tier-list-right">
            <Box sx={{ maxWidth: { xs: 320, sm: 1500 }, bgcolor: 'background.paper' }}>
              <Tabs
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
        </>
      )}
      {mode === VERTICAL && (
        <VerticalTabs
          key={`vertical-${value}`}
          value={value}
          addWish={props.addWish}
          products={props.products}
          user={props.user}
          getReviewByAsin={props.getReviewByAsin}
          toggleShow={toggleShow}
          handleChange={handleChange}
        />
      )}
      
    </ section>
  )
}
