import Box from '@mui/material/Box';
import '../styles/ReviewsPanel.scss';

export default function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`horizontal-tabpanel-${index}`}
      aria-labelledby={`horizontal-tab-${index}`}
      {...other}
      className='tab-panel'
    >
      {value === index && (<>{children}</>)}
    </div>
  );
}