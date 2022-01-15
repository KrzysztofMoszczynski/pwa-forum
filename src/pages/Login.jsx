import react, { useState, useEffect } from 'react';
import styles from './login.module.css';
import { TextField, Box, Button } from '@mui/material';
import { signIn } from '../api/database';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginDisabled, setLoginDisabled] = useState(true);
  const [badData, setBadData] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onBadData = () => {
    setBadData(true);
    setEmail('');
    setPassword('');
  };

  const onSignupClick = () => {
    navigate('../register');
  };

  const handleButtonClick = async () => {
    const res = await signIn(email, password);
    if (res) {
      navigate('../mylist');
    } else {
      onBadData();
    }
  };

  useEffect(() => {
    if (loginDisabled && (email != '') & (password != '')) {
      setLoginDisabled(false);
    } else if (!loginDisabled && (email == '' || password == '')) {
      setLoginDisabled(true);
    }
  }, [email, password]);

  return (
    <div className={styles.window}>
      <Box component='div' className={styles.box}>
        <span className={styles.welcomeText}>Welcome to the app!</span>
        <span className={styles.welcomeText}>Log in here:</span>
        <TextField
          className={styles.textField}
          label='Email'
          variant='outlined'
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          className={styles.textField}
          label='Password'
          variant='outlined'
          value={password}
          type='password'
          onChange={handlePasswordChange}
        />
        {badData && <p>Some data was incorrect!</p>}
        <Button
          className={styles.button}
          variant='contained'
          onClick={handleButtonClick}
          disabled={loginDisabled}>
          Log in
        </Button>
        <span className={styles.registerText}>Don't have an account yet?</span>
        <Button variant='outlined' onClick={onSignupClick}>
          Sign up
        </Button>
      </Box>
    </div>
  );
};

export default Login;
