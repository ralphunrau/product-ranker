import PropTypes from 'prop-types';
import TabPanel from './TabPanel';
import Rating from '@mui/material/Rating';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';


export default function ProductPanel(props) {

  return (
    <TabPanel value={props.value} index={props.index}>
      <div className="product-info">
        <div className='product-details'>
          <b>{props.product.title.split(',')[0]}</b><br/>
          <div className='product-details-section' >
            <Rating name='read-only' value={props.product.rating} precision={0.5} readOnly />
            ({props.product.ratings_total})<br/>
          </div>
          {props.product.price?.raw}
          <div className='product-details-section'>
            {(props.user?.id) && <button onClick={() => props.addWish(props.product)}>Add to Wish!</button>}
            <a href={props.product.link} target="_blank" rel="noreferrer"><button>Visit Product</button></a>
          </div>
        </div>
        <div className='product-reviews'>
          <div className='reviews-header'>
            <b>Reviews</b>
            <FontAwesomeIcon icon={faClose} onClick={props.toggleShow} />
          </div>
        </div>
      </div>      
    </TabPanel>
  )
}