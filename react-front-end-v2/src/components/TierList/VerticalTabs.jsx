import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from './TabPanel';
import Rating from '@mui/material/Rating';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.getReviewsByAsin(null);
  };

  const createTabs = (products) => {
    return products.map((product, index) => {
      let image = <img src={product.image} alt="product" ></img>
      return <Tab label={image} {...a11yProps(index)} />
    })
  }

  const createTabPanels = (products) => {
    return products.map((product, index) => {
      return <TabPanel value={value} index={index}>
                <div>
                  {product.title.split(',')[0]}<br/>
                  {product.price?.raw}<br/>
                  {product.rating}<br/>
                  <Rating name="read-only" value={product.rating} precision={0.5} readOnly /><br/>
                  <div>
                    <a href={product.link}>Visit Product</a>
                    <button onClick={() => props.getReviewsByAsin(product.asin)}>See Reviews!</button>
                    {(props.user.id) && <button onClick={() => props.addWish(product)}>Add to Wish!</button>}
                  </div>
                </div>
                {props.currentReviews[1] && 
                <div className="panel-reviews">
                  <div>
                    <strong>Most Helpful Positive Review:</strong><br/>
                    {props.currentReviews[0]?.body.slice(0, 250)}
                    {props.currentReviews[0]?.body.length > 250 && "..."}<br/>
                    Rating: <Rating name="read-only" value={props.currentReviews[0]?.rating} readOnly />
                    <a href={props.currentReviews[0]?.link}>Review Link</a>
                  </div>
                  <div>
                  <strong>Most Helpful Critical Review:</strong><br/>
                    {props.currentReviews[1]?.body.slice(0, 250)}
                    {props.currentReviews[1]?.body.length > 250 && "..."}<br/>
                    Rating: <Rating name="read-only" value={props.currentReviews[1]?.rating} readOnly />
                    <a href={props.currentReviews[1]?.link}>Review Link</a>
                  </div>
                </div>
                }
              </TabPanel>
    })
  }

  return (
    <div id={props.id} style={{display: 'none'}}>
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          {createTabs(props.products)}
        </Tabs>
        {createTabPanels(props.products)}
        <DisabledByDefaultIcon onClick={props.toggleShow}/>
      </Box>
    </div>

  );
}