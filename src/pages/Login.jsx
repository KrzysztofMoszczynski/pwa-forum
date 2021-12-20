import react from 'react';
import styles from './login.module.css';
import { TextField, Box } from '@mui/material';

const Login = () => {
  return (
    <div>
      <Box component='div' className={styles.box}>
        <TextField
          className={styles.textField}
          label='Login'
          variant='outlined'
        />
        <TextField
          className={styles.textField}
          label='Password'
          variant='outlined'
        />
      </Box>
    </div>
  );
};

export default Login;
