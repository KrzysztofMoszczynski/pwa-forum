import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ComponentAdder from '../components/ComponentAdder';
import styles from './MyList.module.css';
import { Button } from '@mui/material';
import { logout } from '../api/database';
import { useNavigate } from 'react-router-dom';
import {
  addItemToList,
  deleteItemFromList,
  getCurrentUserData,
} from '../api/database';

const MyList = () => {
  const [elements, setElements] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [updateFailed, setUpdateFailed] = useState(false);

  const navigate = useNavigate();

  const addElement = async (value) => {
    let newList = [...elements, value];
    const res = await addItemToList(value);
    if (res) {
      setElements(newList);
      setUpdateFailed(false);
    } else {
      setUpdateFailed(true);
    }
  };

  const handleDelete = async (index) => {
    let newArray = [...elements];
    const item = newArray[index];
    newArray.splice(index, 1);
    const res = await deleteItemFromList(item);
    if (res) {
      setElements(newArray);
      setUpdateFailed(false);
    } else {
      setUpdateFailed(true);
    }
  };

  const onLogout = async () => {
    logout();
    navigate('..');
  };

  const fetchData = async () => {
    const data = await getCurrentUserData();
    if (data.todolist) {
      const todoList = data.todolist.arrayValue.values;
      const fetchedArr = todoList.map((element) => {
        return element.stringValue;
      });
      setElements(fetchedArr);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoaded) {
    return (
      <div className={styles.window}>
        <div className={styles.box}>
          {elements && elements.length > 0 && (
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
          {updateFailed && (
            <p>
              The update failed. There may be a problem with your connection
            </p>
          )}
          <Button
            variant='outlined'
            onClick={onLogout}
            className={styles.logoutButton}>
            Log out
          </Button>
        </div>
      </div>
    );
  } else {
    return <div className={styles.window}>Loading...</div>;
  }
};

export default MyList;
