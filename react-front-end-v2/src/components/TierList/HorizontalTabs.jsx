import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import '../styles/TierList.scss';

export default function HorizontalTabs(props) {
  const [scrollableTab, setScrollableTab] = React.useState(0);

  // Changes index of horizontal tab
  const handleChange = (event, newValue) => {
    setScrollableTab(newValue);
  };

  // Creates each tab element
  const createHortizontalTabs = (products) => {
    return products.map((product) => {
      let image = <img src={product.props.image}></img>
      return <Tab label={image}/>
    })
  }

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 1500 }, bgcolor: 'background.paper' }}>
      <Tabs
        value={scrollableTab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        {createHortizontalTabs(props.products)}
      </Tabs>
    </Box>
  );
}