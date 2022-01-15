import { useState } from 'react';
import styles from './register.module.css';
import { Link } from 'react-router-dom';
import { TextField, Box, Button } from '@mui/material';
import { register } from '../api/database';

const Register = () => {
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [badData, setBadData] = useState(false);

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
    if (password != '' && repeatPassword != '' && password == repeatPassword)
      return true;
    else return false;
  };

  const handleButtonClick = async () => {
    if (email != '' && login != '' && checkPasswords()) {
      setBadData(false);
      const res = await register(login, email, password);
      console.log(res);
    } else {
      setBadData(true);
      setEmail('');
      setLogin('');
      setPassword('');
      setRepeatPassword('');
    }
  };

  /*const handleRegistration = () => {
    const createUser = async (user) => {
      await database.setUser({
        uid: user.uid,
        email: email,
        name: data.name,
        surname: data.surname,
        birthDate: data.birthDate,
        profilePicture: profilePicture,
        backgroundPicture: backgroundPicture,
      });
    };

    if (data.password === data.passwordConfirm) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((result) => {
          createUser(result.user);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };*/

  return (
    <div>
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
        <Link to='/register'>
          <Button variant='contained' onClick={handleButtonClick}>
            Register
          </Button>
        </Link>
        {badData && <p>Some data was incorrect!</p>}
      </Box>
    </div>
  );
};

export default Register;
