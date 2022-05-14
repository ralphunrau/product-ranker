import React from 'react';
import './App.css';

export default function Product(props) {
  return (
    <div>
      <li>
        {props.id}
      </li>
      <li>
        {props.title}
      </li>
      <li>
        {props.link}
      </li>
      <li>
        {props.image}
      </li>
      <li>
        {props.rating}
      </li>
      <li>
        {props.ratings_total}
      </li>
      <li>
        {props.price}
      </li>
    </div>
 );
}