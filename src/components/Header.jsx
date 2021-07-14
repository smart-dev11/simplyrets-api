import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    background: '#F4F4F4',
    height: 103,
    [theme.breakpoints.down('sm')]: {
      height: 63,
    },
  },
  title: {
    fontWeight: 600,
    fontSize: 28,
    paddingLeft: 60,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
      paddingLeft: 17,
    },
  }
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography className={classes.title}>Property Listings</Typography>
    </div>
  )
}

export default Header;
