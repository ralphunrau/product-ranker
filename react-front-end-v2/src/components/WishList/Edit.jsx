import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import WishListItem from './WishListItem';
import Button from '../Button';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Edit(props) {
  const [list, setList] = useState(props.wishes);

  const saveList = (newList) => {
    props.onSave(newList);
    window.localStorage.setItem('wishList', JSON.stringify(list));
  }

  const onDrop = (source, destination, list) => {
    const newList = [...list];
    newList.splice(destination, 0, newList.splice(source,1)[0]);
    setList(newList);
  };

  useEffect(() => {
    setList(props.wishes);
  }, [props.wishes])

  return (
    <DragDropContext 
          onDragEnd={(param) => {            
            onDrop(param.source.index, param.destination ? param.destination.index : param.source.index, list)
          }}
    >
      <div className="wish-list">
        <header>
          <h2><b>Wish List</b></h2>
        </header>
        <div className="edit-button">
          <Button danger onClick={props.onCancel} className="edit-button">Cancel</Button>
        </div>
        <Box sx={{ width: '80%' }} className="wish-list-box">          
          <Droppable droppableId='wishlist'>
            {(provided, snapshot) => (
              <Stack
                ref={provided.innerRef}
                {...provided.droppableProps}
                spacing={1}
                className="wish-list-stack"
              >
              {list.map((product, i) => (                  
                  <Draggable
                    key={'draggable-' + product.id}
                    draggableId={'draggable-' + product.id}
                    index={i}
                  >
                    {(provided, snapshot) => (
                        <Item
                          key={'draggable-item' + product.it}
                          ref={provided.innerRef}                    
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            boxShadow: snapshot.isDragging
                              ? "0 0 0.5rem rgb(36, 47, 61)"
                              : "none",
                            border: snapshot.isDragging
                              ? "solid"
                              : "none",
                            borderBottom: snapshot.isDragging
                              ? "none"
                              : "solid",
                            }}
                        >
                          <WishListItem
                            key={`edit-wish-${i}`}
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
                            edit={true}
                          />                                                 
                        </ Item>
                    )} 
                  </Draggable>
                ))}
              {provided.placeholder}
              </Stack>              
            )}                                    
          </Droppable>                  
        </Box>
        <div className='save-button'>
          <Button confirm onClick={() => saveList(list)} >Save</Button>
        </div>
      </div>
  </DragDropContext>      
  )
}