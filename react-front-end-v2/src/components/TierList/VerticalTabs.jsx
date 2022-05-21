import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from './TabPanel';
import Box from '@mui/material/Box';

import VerticalPanel from './VerticalPanel';

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {id: `vertical-tab-${index}`, 'aria-controls': `vertical-tabpanel-${index}`};
}

export default function VerticalTabs(props) {

  const items = props.products.map((product, index) => {
    let image = <img src={product.image} alt="product" />;
    return <Tab key={`vertical-tab-${index}`} label={image} {...a11yProps(index)} />
  });

  const itemsPanels = props.products.map((product, index) => {
    return (      
      <VerticalPanel
        key={`panel-${index}`}
        index={index}
        value={props.value}
        product={product}
        addWish={props.addWish}
        getReviewByAsin={props.getReviewByAsin}
        user={props.user}
        toggleShow={props.toggleShow}
      />
    ) 
  });

  return (
    <div id={props.id} >
      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={props.value}
          onChange={props.handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          {items}
        </Tabs>
        {itemsPanels}
      </Box>
    </div>
  )
}