import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import { Container, makeStyles } from '@material-ui/core';
import { colors } from '../assets/colors';
import firebase from 'firebase';
import database from '../api/database';

const useStyles = makeStyles({
  container: {
    backgroundColor: colors.AWS_lightGrey,
    minHeight: 'calc(100vh + 64px)',
    marginTop: '48px',
    paddingTop: '16px',
    overflowY: 'auto',
  },
});

function AppComponent(props) {
  const { children } = props;
  const classes = useStyles();

  const [isLoggedIn, setIsLoggedIn] = useState();
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const getUser = async (uid) => {
      return await database.getUser(uid);
    };
    firebase.auth().onAuthStateChanged((currentUser) => {
      setIsLoggedIn(currentUser ? true : false);

      if (currentUser) {
        getUser(currentUser.uid).then((doc) => {
          if (doc.exists) {
            setCurrentUser({ ...doc.data(), uid: currentUser.uid });
          } else {
            setCurrentUser(null);
          }
          setLoading(false);
        });
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });
  }, []);

  return (
    !loading && (
      <>
        <Navbar isLoggedIn={isLoggedIn} />
        <Container className={classes.container} maxWidth='md'>
          {children(currentUser)}
        </Container>
      </>
    )
  );
}

export default AppComponent;
