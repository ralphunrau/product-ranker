import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import WishListItem from './WishListItem';
import Button from '../Button';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Show(props) {

  const wishItem = props.wishes.map((product, i) => {
    console.log(product);
    return (
      <Item
        key={'wish-item'}
        style={{
            border: "none",
          borderBottom: "solid",
        }}
      >
      <WishListItem
          position={i + 1}
          id={product.id}
          image={product.image}
          title={product.title}
          link={product.link}
          price={product.price}
          productId={product.product_id}
          rating={product.rating}
          ratings_total={product.ratings_total}
          removeWish={() => props.removeWish(product.product_id)}
        />                                                 
      </ Item>
    )}
  );

  return (
      <div className="wish-list">
        <div className="edit-button">
          {props.wishes.length > 1 && <Button confirm onClick={props.onEdit} className="edit-button">Edit</Button>}
        </div>
        <Box sx={{ width: '80%' }} className="wish-list-box">          
          <Stack spacing={1} className="wish-list-stack">
            {wishItem}
          </Stack>                                                                 
        </Box>
      </div>
  )
}