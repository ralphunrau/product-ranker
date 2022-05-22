import PropTypes from 'prop-types';
import TabPanel from './TabPanel';
import Rating from '@mui/material/Rating';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';


export default function ProductPanel(props) {

  console.log(props.reviews)

  const currentReviews = props.reviews.map((review) => {
    console.log('PROPS IS', props);
    console.log('REVIEW IS', review);
    return (
      <article>
        <header className="review-title">
          <b>{review.title}</b>
          <Rating name='read-only' value={review.rating} precision={0.5} readOnly />
          {review.date.raw}
        </header>
        <section className="review-body">
          {review.body}
        </section>
      </article>
    )
  })

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
          <div className='reviews'>
            {currentReviews}
          </div>
        </div>
      </div>      
    </TabPanel>
  )
}