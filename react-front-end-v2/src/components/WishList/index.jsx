import { useState } from 'react';

import { styled } from '@mui/material/styles';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

import '../styles/WishList.scss';

const listItems = ['Item1', 'Item2', 'Item3', 'Item4', 'Item5']

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function WishList(props) {
  const [positions, setPositions] = useState({});

  const handleStop = (e, data) => {
    let statePositions = {...positions};

    const itemId = e.target.id;
    statePositions[itemId] = {};

    statePositions[itemId]["x"] = data.x;
    statePositions[itemId]["y"] = data.y;
    setPositions({...positions, ...statePositions});
    console.log('Position is', {...positions})
  }


  return (
    <div className="wish-list">
      <Box sx={{ width: '100%' }} className="wish-list-box">
        <Stack spacing={2} className="wish-list-stack">          
          {listItems.map((listItem) => {
            return (
              <Draggable
                defaultPosition={
                  positions === null ?
                  {x: 0, y: 0}
                  : !positions[listItem[5]]?
                    {x:0, y:0} :
                    {x: positions[listItem].x, y: positions[listItem].y}
                }
                onStop={handleStop}
              >
                <Item id={listItem} className='draggable-item'>{listItem}</ Item>
              </Draggable>
            )
          })}
        </Stack>
      </Box>
    </div>
  )
}