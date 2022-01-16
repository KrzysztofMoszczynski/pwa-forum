import { useState, useEffect } from 'react';
import styles from './register.module.css';
import { useNavigate } from 'react-router-dom';
import { TextField, Box, Button } from '@mui/material';
import { register } from '../api/database';

const Register = () => {
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [badData, setBadData] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value);
  };

  const checkPasswords = () => {
    if (password !== '' && repeatPassword !== '' && password === repeatPassword)
      return true;
    else return false;
  };

  const onBadData = () => {
    setBadData(true);
    setEmail('');
    setLogin('');
    setPassword('');
    setRepeatPassword('');
  };

  const handleButtonClick = async () => {
    if (email !== '' && login !== '' && checkPasswords()) {
      setBadData(false);
      const res = await register(login, email, password);
      if (res) {
        navigate('../mylist');
      } else {
        onBadData();
      }
    } else {
      onBadData();
    }
  };

  useEffect(() => {
    if (
      buttonDisabled &&
      email !== '' &&
      login !== '' &&
      password !== '' &&
      repeatPassword !== ''
    ) {
      setButtonDisabled(false);
    } else if (
      !buttonDisabled &&
      (email === '' || login === '' || password === '' || repeatPassword === '')
    ) {
      setButtonDisabled(true);
    }
  }, [email, login, password, repeatPassword]);

  return (
    <div className={styles.window}>
      <Box className={styles.box}>
        <span className={styles.welcomeText}>Sign up here!</span>
        <div>
          <TextField
            className={styles.textField}
            label='email'
            variant='outlined'
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            className={styles.textField}
            label='login'
            variant='outlined'
            value={login}
            onChange={handleLoginChange}
          />
          <TextField
            className={styles.textField}
            label='password'
            variant='outlined'
            value={password}
            type='password'
            onChange={handlePasswordChange}
          />
          <TextField
            className={styles.textField}
            label='repeat passowrd'
            variant='outlined'
            value={repeatPassword}
            type='password'
            onChange={handleRepeatPasswordChange}
          />
        </div>
        <Button
          variant='contained'
          onClick={handleButtonClick}
          disabled={buttonDisabled}>
          Register
        </Button>
        {badData && <p>Some data was incorrect!</p>}
      </Box>
    </div>
  );
};

export default Register;
