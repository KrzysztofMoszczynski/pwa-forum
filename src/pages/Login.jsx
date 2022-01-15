import react, { useState } from 'react';
import styles from './login.module.css';
import { TextField, Box, Button } from '@mui/material';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleButtonClick = () => {
    setLogin('');
    setPassword('');
  };

  return (
    <div className={styles.window}>
      <Box component='div' className={styles.box}>
        <span className={styles.welcomeText}>Welcome to the app!</span>
        <span className={styles.welcomeText}>Log in here:</span>
        <TextField
          className={styles.textField}
          label='Login'
          variant='outlined'
          value={login}
          onChange={handleLoginChange}
        />
        <TextField
          className={styles.textField}
          label='Password'
          variant='outlined'
          value={password}
          type='password'
          onChange={handlePasswordChange}
        />
        <Button
          className={styles.button}
          variant='contained'
          onClick={handleButtonClick}>
          Log in
        </Button>
        <span className={styles.registerText}>Don't have an account yet?</span>
        <Button variant='outlined'>Sign up</Button>
      </Box>
    </div>
  );
};

export default Login;
