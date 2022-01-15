import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ComponentAdder from '../components/ComponentAdder';
import styles from './MyList.module.css';

const MyList = () => {
  const [elements, setElements] = useState([]);

  const addElement = (value) => {
    let newList = [...elements, value];
    setElements(newList);
  };

  const handleDelete = (index) => {
    let newArray = [...elements];
    newArray.splice(index, 1);
    setElements(newArray);
  };

  return (
    <div>
      {elements && elements.length && (
        <List className={styles.listStyle}>
          {elements.map((element, index) => (
            <ListItem
              key={element}
              className={styles.textStyle}
              secondaryAction={
                <IconButton
                  edge='end'
                  aria-label='delete'
                  onClick={() => handleDelete(index)}>
                  <DeleteIcon />
                </IconButton>
              }>
              <ListItemText primary={element} />
            </ListItem>
          ))}
        </List>
      )}
      <ComponentAdder addElement={addElement} />
    </div>
  );
};

export default MyList;
