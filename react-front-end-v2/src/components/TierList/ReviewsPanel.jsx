import TabPanel from './TabPanel';
import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';

export default function ReviewsPanel(props) {

  console.log('REVIEWS ARE', props.reviews);


  const inWishList = props.wishes.find((wish) => wish.product_id === props.product.asin);

  const currentReviews = props.reviews?.map((review) => {
    return (
      <article>
        <header className="review-title">
          <Rating name='read-only' value={review.rating} precision={0.5} readOnly size='small'/>
          <b>{review?.title}</b>
          {review?.date.raw}
        </header>
        <section className="review-body">
          {review?.body}
        </section>
      </article>
    )
  })

  return (
    <TabPanel value={props.value} index={props.index}>
      {(props.reviews?.length < 1) ? <div className='modal-status'><CircularProgress /></div>: (
        <div className="product-info">
          <div className='product-details'>
            <div className='product-details-section' >
              <b>{props.product.title.split(',')[0]}</b><br/>
            </div>
            <div className='product-details-section'>
              {(props.user?.id && !inWishList) ? <button onClick={() => props.addWish(props.product)}>Add to Wish</button> : <button onClick={() => props.removeWish(props.product.asin)}>Remove Wish</button>}
              <a href={props.product.link} target="_blank" rel="noreferrer"><button>Visit Product</button></a>
            </div>
          </div>
          <div className='product-reviews'>
            <div className='reviews'>
              {currentReviews}
            </div>
          </div>
        </div>      
      )}
    </TabPanel>
  )
}