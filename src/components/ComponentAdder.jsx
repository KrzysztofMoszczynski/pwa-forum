import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import styles from './ComponentAdder.module.css';

const ComponentAdder = ({ addElement }) => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClick = () => {
    if (value.length > 0) {
      addElement(value);
      setValue('');
    }
  };

  return (
    <div className={styles.containerStyle}>
      <TextField
        variant='outlined'
        value={value}
        placeholder='Add something to your list'
        onChange={handleChange}
      />
      <Button
        variant='contained'
        className={styles.buttonStyle}
        onClick={handleClick}>
        Add!
      </Button>
    </div>
  );
};

export default ComponentAdder;
