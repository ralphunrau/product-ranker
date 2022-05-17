import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../styles/TierList.scss'

export default function ItemPopup(props) {
  return (
    <Card onClick={props.clickHandler} className='item-popup' sx={{ maxWidth: 345 }}>
      <img src={props.image} height="140px"></img>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.price}
          {props.rating}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={props.link}>Visit Amazon Page</Button>
      </CardActions>
    </Card>
  );
}
