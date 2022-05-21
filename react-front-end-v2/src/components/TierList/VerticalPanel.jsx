import PropTypes from 'prop-types';
import TabPanel from './TabPanel';
import Rating from '@mui/material/Rating';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import useVisualMode from '../../hooks/useVisualMode';

import {DETAILS, REVIEWS} from '../../helper/modes';

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

export default function VerticalPanel(props) {
  const {mode, transition} = useVisualMode(DETAILS);

  return (
    <TabPanel value={props.value} index={props.index}>
      <div className="product-info">
        <FontAwesomeIcon icon={faClose} onClick={props.toggleShow} />
        {props.product.title.split(',')[0]}
        {props.product.price?.raw}
        {props.product.rating}
        <Rating name='read-only' value={props.product.rating} precision={0.5} readOnly />
        <a href={props.product.link} target="_blank" rel="noreferrer">Visit Product</a>
        <button onClick={() => props.getReviewsByAsin(props.product.asin)}>See Reviews!</button>
        {(props.user.id) && <button onClick={() => props.addWish(props.product)}>Add to Wish!</button>}
      </div>
      <div>
        {mode === DETAILS && <p>THIS IS THE PRODUCT INFORMATIONS</p>}
        {mode === REVIEWS && <p>THIS IS THE PRODUCT REVIEWS</p>}
      </div>
    </TabPanel>
  )
}