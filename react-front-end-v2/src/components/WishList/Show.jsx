import { useState } from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Modal from '@mui/material/Modal';

import WishListItem from './WishListItem';
import Button from '../Button';
import TabPanel from '../TierList/TabPanel';
import Confirm from './Confirm';

import useVisualMode from '../../hooks/useVisualMode';
import { HIDDEN, CONFIRM } from '../../helper/modes';

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '25%',
  maxHeight: '60%',
  bgcolor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '5px',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Show(props) {
  const [value, setValue] = useState(null);
  const {mode, transition, back} = useVisualMode(HIDDEN);

  const onRemove = (index) => {
    setValue(index);
    transition(CONFIRM);
  };

  const onConfirm = (id) => {
    props.removeWish(id);
    setValue(null);
    transition(HIDDEN);
  }

  const onClose = () => {
    setValue(null);
    transition(HIDDEN);
  };

  const confirmPanel = props.wishes.map((item, i) => {
    return (
      <Confirm
        key={`confirm-panel-${i}`}
        onConfirm={() => onConfirm(item.product_id)}
        onCancel={onClose}
        value={value}
        index={i}
      />
    )
  })

  const wishItem = props.wishes.map((product, i) => {
    return (
      <Item
        key={`wish-item-${i}`}
        style={{
            border: "none",
          borderBottom: "solid",
        }}
      >
      <WishListItem
          key={`wish-${i}`}
          position={i + 1}
          id={product.id}
          image={product.image}
          title={product.title}
          link={product.link}
          price={product.price}
          productId={product.product_id}
          rating={product.rating}
          ratings_total={product.ratings_total}
          removeWish={() => onRemove(i)}
          edit={false}
        />                                                 
      </ Item>
    )}
  );

  return (
      <div className="wish-list">
        <header>
          <h2><b>Wish Basket</b></h2>
        </header>
        {props.wishes.length > 0 ? (
          <>
            <div className="edit-button">
              {props.wishes.length > 0 && <Button confirm onClick={props.onEdit} className="edit-button">Edit</Button>}
            </div>
            <Box sx={{ width: '80%' }} className="wish-list-box">          
              <Stack spacing={1} className="wish-list-stack">
                {wishItem}
              </Stack>                                                                 
            </Box>
          </>
        ) : (
          <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="info">
            <AlertTitle><strong>Your Wish Basket is empty!</strong></AlertTitle>
              Pick a category or search for a product to add to your list.
            </Alert>
          </Stack>
        )}
        <Modal
          open={mode === CONFIRM}
          onClose={() => back()}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >  
          <Box sx={style} className="confirm-panel" >
            {confirmPanel}
          </Box>  
        </Modal>
      </div>
  )
}