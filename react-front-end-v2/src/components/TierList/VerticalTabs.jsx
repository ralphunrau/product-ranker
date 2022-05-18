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
    console.log('newValue:', newValue);
    console.log('event:', event);
  };

  const createTabs = (products) => {
    return products.map((product, index) => {
      let image = <img src={product.image}></img>
      return <Tab label={image} {...a11yProps(index)} />
    })
  }

  const createTabPanels = (products) => {
    return products.map((product, index) => {
      return <TabPanel value={value} index={index}>
                {product.title}<br/>
                {product.price?.raw}<br/>
                {product.rating}<br/>
                <Rating name="read-only" value={product.rating} precision={0.5} readOnly /><br/>
                <a href={product.link}>Visit The Amazon product</a>
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